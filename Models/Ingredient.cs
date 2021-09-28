using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à un ingrédent.
    /// </summary>
    public class Ingredient
    {
        /// <summary>
        /// Identifiant d'un ingrédient
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Nom de l'ingrédient
        /// </summary>
        [Required]
        public string Nom { get; set; }

        /// <summary>
        /// Catégorie de l'ingrédient
        /// </summary>
        public CategoriesIngredient Categorie { get; set;}

        /// <summary>
        /// Disponibilité de l'ingrédient
        /// </summary>
        public bool Disponible { get; set;}
    }
}