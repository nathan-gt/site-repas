using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SiteRepas.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using static SiteRepas.Utilities;

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
            if (context.Ingredients.Any()) {
                return;  //Le seed a déjà été fait
            }

            //Ajout de ingrédients à la bd
            context.Ingredients.AddRange(
                new Ingredient {
                    Nom = "Steak haché",
                    Categorie = "Viande"
                },
                new Ingredient {
                    Nom = "Patate",
                    Categorie = "Légume"
                },
                new Ingredient {
                    Nom = "Maïs",
                    Categorie = "Légume"
                },
                new Ingredient {
                    Nom = "Pâte à pizza",
                    Categorie = "Pâte",
                    UnRepasId = 10,
                    FamilleId = 1,
                    Disponible = true
                },
                new Ingredient {
                    Nom = "Sauce marinara",
                    Categorie = "Sauce",
                    UnRepasId = 10,
                    FamilleId = 1,
                    Disponible = false
                },
                new Ingredient {
                    Nom = "Poivron vert",
                    Categorie = "Légume",
                    UnRepasId = 10,
                    FamilleId = 1,
                    Disponible = true
                },
                new Ingredient {
                    Nom = "Fromage",
                    Categorie = "Laitié",
                    UnRepasId = 10,
                    FamilleId = 1,
                    Disponible = false
                },
                new Ingredient {
                    Nom = "Viande",
                    Categorie = "Viande",
                    UnRepasId = 12,
                    FamilleId = 1,
                    Disponible = false
                },
                new Ingredient {
                    Nom = "Fromage Craft",
                    Categorie = "Laitié",
                    UnRepasId = 12,
                    FamilleId = 1,
                    Disponible = false
                },
                new Ingredient {
                    Nom = "Pain",
                    Categorie = "Laitié",
                    UnRepasId = 12,
                    FamilleId = 1,
                    Disponible = false
                }
            ); ;
            context.SaveChanges();
            //Ajout de plats à la bd
            context.Repas.AddRange(
                new UnRepas {
                    Nom = "Salade",
                    Categorie = "Végétarien",
                    IdFamille = 1
                },
                new UnRepas {
                    Nom = "Buritos",
                    Categorie = "Mexicain",
                    IdFamille = 1
                },
                new UnRepas {
                    Nom = "Pâte carbonara",
                    Categorie = "Italien",
                    IdFamille = 1
                },
                new UnRepas {
                    Nom = "Pâte bolognaise",
                    Categorie = "Italien",
                    IdFamille = 2
                },
                new UnRepas {
                    Nom = "Fondue chinoise",
                    Categorie = "None",
                    IdFamille = 2
                },
                new UnRepas {
                    Nom = "Raclette",
                    Categorie = "Américain",
                    IdFamille = 2
                },
                new UnRepas {
                    Nom = "Hamburger",
                    Categorie = "Américain",
                    IdFamille = 1
                },
                new UnRepas {
                    Nom = "Doigt de poulet",
                    Categorie = "Américain",
                    IdFamille = 1
                },
                new UnRepas {
                    Nom = "Gnocci",
                    Categorie = "Italien",
                    IdFamille = 2
                },
                new UnRepas {
                    Nom = "Pizza",
                    Categorie = "Italien",
                    IdFamille = 1,
                    DateCalendrier = new DateTime(2021, 11, 19),
                    Responsable = "Test1@test.com"
                },
                new UnRepas {
                    Nom = "Hamburger",
                    Categorie = "Américain",
                    IdFamille = 1,
                    DateCalendrier = new DateTime(2021, 12, 19),
                    Responsable = "Test2@test.com"
                },
                new UnRepas {
                    Nom = "Hamburger",
                    Categorie = "Américain",
                    IdFamille = 1,
                    DateCalendrier = new DateTime(2021, 12, 20),
                    Responsable = "Test2@test.com"
                });

            var familles = new Famille[] {
                new Famille {
                    Nom = "Roy"
                },
                new Famille {
                    Nom = "Legault"
                },
                new Famille {
                    Nom = "Drouin"
                },
                new Famille {
                    Nom = "LeBlanc"
                }
                };
            //Ajout de familles à la bd
            context.Familles.AddRange(familles);


            // Ajout users
            var hasher = new PasswordHasher<ApplicationUser>();

            var users = new ApplicationUser[] {
                new ApplicationUser() {
                    UserName = "Test1@test.com",
                    Email = "Test1@test.com",
                    Famille = familles[0],
                    NormalizedUserName = "TEST1@TEST.COM",
                    NormalizedEmail = "TEST1@TEST.COM",
                    EmailConfirmed = true,
                    IsAdminFamille = true
                },
                new ApplicationUser() {
                    UserName = "Test2@test.com",
                    Email = "Test2@test.com",
                    NormalizedUserName = "TEST2@TEST.COM",
                    Famille = familles[0],                 
                    NormalizedEmail = "TEST2@TEST.COM",
                    EmailConfirmed = true,
                },
                new ApplicationUser() {
                    UserName = "Test3@test.com",
                    Email = "Test3@test.com",
                    Famille = familles[1],
                    NormalizedUserName = "TEST3@TEST.COM",
                    IsAdminFamille = true,
                    NormalizedEmail = "TEST3@TEST.COM",
                    EmailConfirmed = true,

                },
                new ApplicationUser() {
                    UserName = "Test4@test.com",
                    Email = "Test4@test.com",
                    NormalizedUserName = "TEST4@TEST.COM",
                    NormalizedEmail = "TEST4@TEST.COM",
                    EmailConfirmed = true,
                    Famille = familles[1]
                },
                new ApplicationUser() {
                    UserName = "Test5@test.com",
                    Email = "Test5@test.com",
                    Famille = familles[2],
                    NormalizedUserName = "TEST5@TEST.COM",
                    NormalizedEmail = "TEST5@TEST.COM",
                    EmailConfirmed = true,
                    IsAdminFamille = true
                },
                new ApplicationUser() {
                    UserName = "Test6@test.com",
                    Email = "Test6@test.com",
                    NormalizedUserName = "TEST6@TEST.COM",
                    NormalizedEmail = "TEST6@TEST.COM",
                    EmailConfirmed = true,
                    Famille = familles[2]
                }
            };

            // Ajout des mots de passes hachés aux users
            foreach(ApplicationUser user in users) {
                user.PasswordHash = hasher.HashPassword(user, user.Email);
            }

            context.ApplicationUser.AddRange(users);
            context.SaveChanges();

        }
    }
}