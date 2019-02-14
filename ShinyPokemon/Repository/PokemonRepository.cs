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

        public List<Pokemon> GetAllShinies()
        {
            return pokemonContext.Pokemons.Where(x => x.Shiny == true).ToList();
        }

        public Pokemon GetPokemonShiny(int id)
        {
            return pokemonContext.Pokemons.FirstOrDefault(x => x.Number == id && x.Shiny == true);
        }

        public Pokemon GetPreviousPokemonShiny(int id)
        {
            return pokemonContext.Pokemons.OrderByDescending(x => x.Number).FirstOrDefault(x => x.Number < id && x.Shiny == true);
        }

        public Pokemon GetNextPokemonShiny(int id)
        {
            return pokemonContext.Pokemons.OrderBy(x => x.Number).FirstOrDefault(x => x.Number > id && x.Shiny == true);
        }
                    
        public List<Pokemon> GetEvolutionLine(int id)
        {
            List<Pokemon> evolutionLine = new List<Pokemon>();
            Pokemon p = GetPokemonShiny(id);

            if (p.EvolutionFrom != 0)
            {
                GetAncestralEvolutionLine(evolutionLine, p.EvolutionFrom);
            }

            evolutionLine.Add(p);

            if(p.EvolutionTo != 0)
            {
                GetFutureEvolutionLine(evolutionLine, p.EvolutionTo);  
            }

            return evolutionLine;
        }

        private void GetAncestralEvolutionLine(List<Pokemon> evolutionLine, int id)
        {
            Pokemon p = GetPokemonShiny(id);

            if (p.EvolutionFrom != 0)
            {
                GetAncestralEvolutionLine(evolutionLine, p.EvolutionFrom);
            }

            evolutionLine.Add(p);
        }

        private void GetFutureEvolutionLine(List<Pokemon> evolutionLine, int id)
        {
            Pokemon p = GetPokemonShiny(id);
            evolutionLine.Add(p);

            if (p.EvolutionTo != 0)
            {
                GetFutureEvolutionLine(evolutionLine, p.EvolutionTo);
            }
        }
    }
}
