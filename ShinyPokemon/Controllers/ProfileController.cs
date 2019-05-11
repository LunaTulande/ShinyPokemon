using System.Collections.Generic;
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
        private readonly PokemonRepository _pokemonRepository;


        public ProfileController(UserManager<AppUser> userManager, AppUserContext appDbContext, IHttpContextAccessor httpContextAccessor, PokemonRepository pokemonRepository)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
            _pokemonRepository = pokemonRepository;
        }

        // GET api/profile/authHome
        [HttpGet]
        public async Task<IActionResult> AuthHome()
        {
            // retrieve the user info
            // HttpContext.User
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var trainer = await _appDbContext.Trainers.Include(c => c.Identity).FirstOrDefaultAsync(c => c.Identity.Id == userId.Value);

            return new OkObjectResult(new
            {
                trainer.Identity.FirstName,
                trainer.Identity.PictureUrl,
                trainer.Id
            });
        }
        
        // POST api/profile/pokedexAdd/trainer/5/pokemon/1
        [HttpPost("trainer/{trainerId}/pokemon/{pokemonId}")]
        public ActionResult PokedexAdd(int trainerId, int pokemonId)
        {
            if (_pokemonRepository.PokedexRegister(trainerId, pokemonId))
            {
                return BadRequest(new { message = "The shiny pokemon with id: " + pokemonId + " is already registered for this trainer."});
                }
            else
            {
                _pokemonRepository.PokedexAdd(trainerId, pokemonId);
                return Ok();
            }
            
        }

        // GET api/profile/pokedex/trainer/5
        [HttpGet("trainer/{trainerId}")]
        public List<int> Pokedex(int trainerId)
        {
            return _pokemonRepository.GetPokedex(trainerId);
        }

        // REMOVE api/profile/pokedexRemove/trainer/5/pokemon/1
        [HttpDelete("trainer/{trainerId}/pokemon/{pokemonId}")]
        public ActionResult PokedexRemove(int trainerId, int pokemonId)
        {
            if(_pokemonRepository.PokedexRegister(trainerId, pokemonId))
            {
                _pokemonRepository.PokedexRemove(trainerId, pokemonId);
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "The shiny pokemon with id: " + pokemonId + " is not registered for this trainer." });
            }
        }
    }
}
