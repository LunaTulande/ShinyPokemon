using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShinyPokemon
{
    public class PokemonRepository
    {
        PokemonContext pokemonContext;
        public PokemonRepository(PokemonContext pokemonContext)
        {
            this.pokemonContext = pokemonContext;
        }

        public List<Pokemon> getAllShinies()
        {
            return pokemonContext.Pokemons.Where(x => x.Shiny == true).ToList();
        }

        public Pokemon GetPokemonShiny(int id)
        {
            return pokemonContext.Pokemons.FirstOrDefault(x => x.Number == id && x.Shiny == true);
        }
    }
}
