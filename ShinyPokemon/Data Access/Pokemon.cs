using System;
using System.Collections.Generic;

namespace ShinyPokemon.Data_Access
{
    public partial class Pokemon
    {
        public Pokemon()
        {
            Pokedexes = new HashSet<Pokedex>();
        }

        public int Idpokemon { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public int Generation { get; set; }
        public bool Shiny { get; set; }
        public string Img { get; set; }
        public string ImgShiny { get; set; }
        public DateTime? ShinyReleaseDate { get; set; }
        public string ShinyReleaseEvent { get; set; }
        public int EvolutionFrom { get; set; }

        public virtual ICollection<Pokedex> Pokedexes { get; set; }
    }
}