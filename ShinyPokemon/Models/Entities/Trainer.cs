
namespace ShinyPokemon.Models.Entities
{
    public class Trainers
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
    }
}
