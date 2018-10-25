using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ShinyPokemon
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

        public virtual DbSet<Pokemon> Pokemons { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-3E632JF;Initial Catalog=Pokemon;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pokemon>(entity =>
            {
                entity.HasKey(e => e.Idpokemon);

                entity.ToTable("Pokemon");

                entity.HasIndex(e => e.Name)
                    .HasName("IX_Pokemon_1")
                    .IsUnique();

                entity.HasIndex(e => e.Number)
                    .HasName("IX_Pokemon")
                    .IsUnique();

                entity.Property(e => e.Idpokemon)
                    .HasColumnName("IDpokemon")
                    .ValueGeneratedNever();

                entity.Property(e => e.Img).HasMaxLength(50);

                entity.Property(e => e.ImgShiny).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
