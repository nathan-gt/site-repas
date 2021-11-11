using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à un ingrédent.
    /// </summary>
    [Index(nameof(Nom), IsUnique = true)]
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
        // [Key]
        // [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Nom { get; set; }

        /// <summary>
        /// Catégorie de l'ingrédient
        /// </summary>
        public string Categorie { get; set;}

        /// <summary>
        /// Disponibilité de l'ingrédient
        /// </summary>
        public bool Disponible { get; set;}
    }
}