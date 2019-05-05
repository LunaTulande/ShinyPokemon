using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ShinyPokemon.Models;
using ShinyPokemon.Models.Entities;
using ShinyPokemon.Data_Access;
using ShinyPokemon.Models.ViewModels;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;
using ShinyPokemon.Helpers;

namespace ShinyPokemon.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExternalAuthController : Controller
    {
        private readonly AppUserContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private readonly JwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(IOptions<FacebookAuthSettings> fbAuthSettingsAccessor, UserManager<AppUser> userManager, AppUserContext appDbContext, JwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
            _userManager = userManager;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/externalauth/facebook
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]FacebookAuthViewModel model)
        {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppKey}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid facebook token.", ModelState));
            }

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v3.2/me?fields=id,email,first_name,name,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            // 4. ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                var appUser = new AppUser
                {
                    FirstName = userInfo.FirstName,
                    FacebookId = userInfo.Id,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    PictureUrl = userInfo.Picture.Data.Url
                };

                var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

                if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                await _appDbContext.Trainers.AddAsync(new Trainers { IdentityId = appUser.Id });
                await _appDbContext.SaveChangesAsync();
            }

            // generate the jwt for the local user...
            var localUser = await _userManager.FindByNameAsync(userInfo.Email);

            if (localUser == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Failed to create local user account.", ModelState));
            }

            var jwt = await Token.GenerateJwt(_jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id),
              _jwtFactory, localUser.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return new OkObjectResult(jwt);
        }
    }
}
