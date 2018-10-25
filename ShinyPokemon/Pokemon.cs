using System;
using System.Collections.Generic;

namespace ShinyPokemon
{
    public partial class Pokemon
    {
        public int Idpokemon { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public int Generation { get; set; }
        public bool Shiny { get; set; }
        public string Img { get; set; }
        public string ImgShiny { get; set; }
    }
}
