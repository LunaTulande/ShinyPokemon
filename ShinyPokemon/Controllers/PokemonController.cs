using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        // GET api/<controller>/shinies
        [HttpGet("shinies")]
        public List<Pokemon> GetAllShinies()
        {
            return pokemonRepository.GetAllShinies();
        }

        // GET api/<controller>/#
        [HttpGet("{id}")]
        public Pokemon Get(int id)
        {
            var selectedPokemon = pokemonRepository.GetPokemonShiny(id);
            return selectedPokemon;
        }

        // GET api/<controller>/#/previousShiny
        [HttpGet("{id}/previousShiny")]
        public Pokemon GetPreviousShiny(int id)
        {
            var previousShiny = pokemonRepository.GetPreviousPokemonShiny(id);
            return previousShiny;
        }

        // GET api/<controller>/#/nextShiny
        [HttpGet("{id}/nextShiny")]
        public Pokemon GetNextShiny(int id)
        {
            var nextShiny = pokemonRepository.GetNextPokemonShiny(id);
            return nextShiny;
        }

        // GET api/<controller>/#/evolutionLine
        [HttpGet("{id}/evolutionLine")]
        public List<Pokemon> GetEvolutionLine(int id)
        {
            var evolutionLine = pokemonRepository.GetEvolutionLine(id);
            return evolutionLine;
        }

        
        /*
        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
            db.Add(value);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    */
    }
}
