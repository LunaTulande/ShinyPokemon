using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShinyPokemon.Data_Access;
using ShinyPokemon.Models.Entities;

namespace ShinyPokemon.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]/[action]")]
    public class ProfileController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly AppUserContext _appDbContext;

        public ProfileController(UserManager<AppUser> userManager, AppUserContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
        }

        // GET api/profile/authHome
        [HttpGet]
        public async Task<IActionResult> AuthHome()
        {
            // retrieve the user info
            // HttpContext.User
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var customer = await _appDbContext.Trainers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);

            return new OkObjectResult(new
            {
                Message = "This is secure API and user data!",
                customer.Identity.FirstName,
                customer.Identity.PictureUrl,
                customer.Identity.FacebookId
            });
        }
    }
}
