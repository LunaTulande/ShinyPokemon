using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShinyPokemon.Models.Entities;

namespace ShinyPokemon.Data_Access
{
    public class AppUserContext : IdentityDbContext<AppUser>
    {
        public AppUserContext(DbContextOptions<AppUserContext> options) : base(options) { }
        
        public DbSet<Customer> Customers { get; set; }
    }
}
