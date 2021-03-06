using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SiteRepas.Models;
using SiteSiteRepas.Models;
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

        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<UnRepas> Repas { get; set; }

        public DbSet<Famille> Familles { get; set; }

        public DbSet<ApplicationUser> ApplicationUser { get; set; }

        public DbSet<JointureRepasIngredients> JointureRepasIngredients { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             
            modelBuilder.Entity<Ingredient>().ToTable("Ingredients");
            modelBuilder.Entity<UnRepas>().ToTable("Repas");
            modelBuilder.Entity<Famille>().ToTable("Familles");
            modelBuilder.Entity<ApplicationUser>().ToTable("Utilisateurs");
            modelBuilder.Entity<JointureRepasIngredients>().ToTable("JointureRepasIngredients");
            
           base.OnModelCreating(modelBuilder);
        }
    }
}
