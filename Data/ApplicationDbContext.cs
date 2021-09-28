using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SiteRepas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteRepas.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions
            )
        {
        }

        // public DbSet<Ingredient> Ingredient { get; set; }

        // public DbSet<Repas> Repas { get; set; }

        // public DbSet<Famille> Famille { get; set; }

        // //public DbSet<Utilisateur> Utilisateur { get; set; }


        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Ingredient>().ToTable("Ingredient");
        //     modelBuilder.Entity<Repas>().ToTable("Repas");
        //     modelBuilder.Entity<Famille>().ToTable("Famille");
        //     //modelBuilder.Entity<Utilisateur>().ToTable("Utilisateur");
        // }
    }
}
