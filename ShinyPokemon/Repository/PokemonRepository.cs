﻿using System.Collections.Generic;
using System.Linq;
using ShinyPokemon.Data_Access;

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
        
        public List<List<Pokemon>> GetEvolutionLine(int id)
        {
            Pokemon currentPokemon = GetPokemonShiny(id);
            Pokemon parent;
            List<List<Pokemon>> evolutions = new List<List<Pokemon>>();

            if(currentPokemon.EvolutionFrom != 0)
            {
                parent = GetParent(currentPokemon.EvolutionFrom);
            }
            else
            {
                parent = currentPokemon;
            }
            List<Pokemon> parentList = new List<Pokemon>();
            parentList.Add(parent);
            evolutions.Add(parentList);

            List<Pokemon> children = GetChildren(parent.Idpokemon); //ask after all evos from parent            
            if (children.Count > 0) {                
                foreach (Pokemon child in children)
                {
                    List<Pokemon> childrenFamily = new List<Pokemon>(); //list with one of evos from parent with its evo if this exist
                    childrenFamily.Add(child);
                    List<Pokemon> grandchildren = GetChildren(child.Idpokemon);
                    if (grandchildren.Count > 0)
                    {//hardcode: asumme child has max one child
                        childrenFamily.Add(grandchildren[0]);
                    }
                    evolutions.Add(childrenFamily);
                }
            }
            return evolutions;
        }
        private Pokemon GetParent(int id)
        {
            Pokemon parent = GetPokemonShiny(id);
            if (parent.EvolutionFrom != 0)
            {
                parent = GetParent(parent.EvolutionFrom);
            }
            return parent;
        }
        private List<Pokemon> GetChildren(int id)
        {
            return pokemonContext.Pokemons.Where(x => x.EvolutionFrom == id && x.Shiny == true).ToList();
        }

        //methods in profile controller
        public bool PokedexRegister(int trainerId, int pokemonId)
        {
            return (pokemonContext.Pokedexes.FirstOrDefault(x => x.TrainerId == trainerId && x.PokemonId == pokemonId) != null);
        }

        public void PokedexAdd(int trainerId, int pokemonId)
        {
            var pokedex = new Pokedex { TrainerId = trainerId,
                                        PokemonId = pokemonId };

            pokemonContext.Pokedexes.Add(pokedex);
            pokemonContext.SaveChanges();
        }

        public List<int> GetPokedex(int trainerId)
        {
            return pokemonContext.Pokedexes.Where(x => x.TrainerId == trainerId).Select(x => x.PokemonId).ToList();
        }
    }
}
