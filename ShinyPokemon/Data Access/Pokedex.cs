using System;
using System.Collections.Generic;

namespace ShinyPokemon.Data_Access
{
    public partial class Pokedex
    {
        public int Id { get; set; }
        public int TrainerId { get; set; }
        public int PokemonId { get; set; }

        public virtual Pokemon Pokemon { get; set; }
    }
}