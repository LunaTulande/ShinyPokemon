using System;
using System.Collections.Generic;

namespace ShinyPokemon.Data_Access
{
    public partial class Trainer
    {
        public Trainer()
        {
            Pokedexes = new HashSet<Pokedex>();
        }

        public int Id { get; set; }
        public string IdentityId { get; set; }

        public virtual ICollection<Pokedex> Pokedexes { get; set; }
    }
}