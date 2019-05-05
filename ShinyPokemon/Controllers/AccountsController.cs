using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ShinyPokemon.Data_Access;
using ShinyPokemon.Models.Entities;
using ShinyPokemon.Models.ViewModels;

namespace ShinyPokemon.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly AppUserContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, AppUserContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // Create api user account
        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Helpers.Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.Trainers.AddAsync(new Trainers { IdentityId = userIdentity.Id });
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
    }
}
