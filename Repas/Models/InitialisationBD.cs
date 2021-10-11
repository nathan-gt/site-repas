using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SiteRepas.Data;
using System;
using System.Collections.Generic;
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
            if(context.Ingredient.Any())
            {
                return;  //Le seed a déjà été fait
            }

            //Ajoute des ingrédients à la bd
            context.Ingredient.AddRange(
                new Ingredient
                {
                    Nom = "Steak haché",
                    Categorie = "Viande"
                },
                new Ingredient
                {
                    Nom = "Patate",
                    Categorie = "Légume"
                },
                new Ingredient
                {
                    Nom = "Maïs",
                    Categorie = "Légume"
                },
                new Ingredient
                {
                    Nom = "Pâte à pizza",
                    Categorie = "Pâte"
                },
                new Ingredient
                {
                    Nom = "Sauce marinara",
                    Categorie = "Sauce"
                },
                new Ingredient
                {
                    Nom = "Poivron vert",
                    Categorie = "Légume"
                },
                new Ingredient
                {
                    Nom = "Fromage",
                    Categorie = "Laitié"
                }
            );
            context.SaveChanges();
            //Ajoute des plats à la bd
            context.Repas.AddRange(
                new UnRepas {
                    Nom = "Pâté chinois",
                    Categorie = "Québécois",
                },
                new UnRepas {
                    Nom = "Buritos",
                    Categorie = "Mexicain",
                },
                new UnRepas {
                    Nom = "Pâte carbonara",
                    Categorie = "Italien",
                },
                new UnRepas {
                    Nom = "Pâte bolognaise",
                    Categorie = "Italien",
                },
                new UnRepas {
                    Nom = "Fondue chinoise",
                    Categorie = "Carnivore",
                },
                new UnRepas {
                    Nom = "Raclette",
                    Categorie = "Américain",
                },
                new UnRepas {
                    Nom = "Hamburger",
                    Categorie = "Américain",
                },
                new UnRepas {
                    Nom = "Doigt de poulet",
                    Categorie = "Américain",
                },
                new UnRepas {
                    Nom = "Gnocci",
                    Categorie = "Italien",
                },
                new UnRepas {
                    Nom = "Pizza",
                    Categorie = "Italien"
                }) ; 
            context.SaveChanges();
        }
    }
}