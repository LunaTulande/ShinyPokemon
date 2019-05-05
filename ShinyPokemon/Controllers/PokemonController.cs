using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ShinyPokemon.Data_Access;

namespace ShinyPokemon.Controllers
{
    [Route("api/[controller]")]
    public class PokemonController : Controller
    {
        PokemonRepository pokemonRepository;

        public PokemonController(PokemonRepository pokemonRepository)
        {
            this.pokemonRepository = pokemonRepository;
        }

        // GET api/shinies
        [HttpGet("shinies")]
        public List<Pokemon> GetAllShinies()
        {
            return pokemonRepository.GetAllShinies();
        }

        // GET api/#
        [HttpGet("{id}")]
        public Pokemon Get(int id)
        {
            var selectedPokemon = pokemonRepository.GetPokemonShiny(id);
            return selectedPokemon;
        }

        // GET api/#/previousShiny
        [HttpGet("{id}/previousShiny")]
        public Pokemon GetPreviousShiny(int id)
        {
            var previousShiny = pokemonRepository.GetPreviousPokemonShiny(id);
            return previousShiny;
        }

        // GET api/#/nextShiny
        [HttpGet("{id}/nextShiny")]
        public Pokemon GetNextShiny(int id)
        {
            var nextShiny = pokemonRepository.GetNextPokemonShiny(id);
            return nextShiny;
        }

        // Get api/#/evolutions
        [HttpGet("{id}/evolutionLine")]
        public List<List<Pokemon>> GetEvolutionLine(int id)
        {
            var evolutions = pokemonRepository.GetEvolutionLine(id);
            return evolutions;
        }
    }
}
