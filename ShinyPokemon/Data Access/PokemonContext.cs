using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ShinyPokemon.Data_Access
{
    public partial class PokemonContext : DbContext
    {
        public PokemonContext()
        {
        }

        public PokemonContext(DbContextOptions<PokemonContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Pokedex> Pokedexes { get; set; }
        public virtual DbSet<Pokemon> Pokemons { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-N93387EQ;Initial Catalog=ShinyPokemon;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Pokedex>(entity =>
            {
                entity.ToTable("Pokedex");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Pokemon)
                    .WithMany(p => p.Pokedexes)
                    .HasForeignKey(d => d.PokemonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Pokedex_Pokemon");
            });

            modelBuilder.Entity<Pokemon>(entity =>
            {
                entity.HasKey(e => e.Idpokemon);

                entity.ToTable("Pokemon");

                entity.Property(e => e.Idpokemon)
                    .HasColumnName("IDpokemon")
                    .ValueGeneratedNever();

                entity.Property(e => e.Img).HasMaxLength(50);

                entity.Property(e => e.ImgShiny).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Obtainable).HasMaxLength(50);

                entity.Property(e => e.ShinyReleaseDate).HasColumnType("date");

                entity.Property(e => e.ShinyReleaseEvent).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}