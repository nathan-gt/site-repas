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
                    Categorie = CategoriesIngredient.Viande
                },
                new Ingredient
                {
                    Nom = "Patate",
                    Categorie = CategoriesIngredient.Légume
                },
                new Ingredient
                {
                    Nom = "Maïs",
                    Categorie = CategoriesIngredient.Légume
                },
                new Ingredient
                {
                    Nom = "Pâte à pizza",
                    Categorie = CategoriesIngredient.Pâte
                },
                new Ingredient
                {
                    Nom = "Sauce marinara",
                    Categorie = CategoriesIngredient.Sauce
                },
                new Ingredient
                {
                    Nom = "Poivron vert",
                    Categorie = CategoriesIngredient.Légume
                },
                new Ingredient
                {
                    Nom = "Fromage",
                    Categorie = CategoriesIngredient.Laitié
                }
            );
            context.SaveChanges();
            //Ajoute des plats à la bd
            context.Repas.AddRange(
                new UnRepas 
                {
                    Nom = "Pâté chinois",
                    Categorie = CategoriesRepas.Québécois,
                },
                new UnRepas 
                {
                    Nom = "Pizza",
                    Categorie = CategoriesRepas.Italien
                });
            context.SaveChanges();
        }
    }
}