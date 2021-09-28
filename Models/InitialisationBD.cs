using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SiteRepas.Data;
using System;
using System.Linq;

namespace SiteRepas.Models
{
    /// <summary>
    /// Classe permettant d'initialiser la base de données
    /// </summary>
    public class InitialisationBD
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {   
            using var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ApplicationDbContext>>(), null);
        }
    }
}