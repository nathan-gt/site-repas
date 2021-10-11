using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à un repas.
    /// </summary>

    public class UnRepas
    {
        /// <summary>
        /// Identifiant d'un repas (unique)
        /// </summary>
        [Key]
        public int Id { get; set;}

        /// <summary>
        /// Nom du repas (non unique)
        /// </summary>
        [Required]
        public string Nom { get; set; }

        /// <summary>
        /// Catégorie du repas
        /// </summary>
        public string Categorie { get; set;}

        /// <summary>
        /// Liste d'ingrédients pour le repas
        /// </summary>
        public ICollection<Ingredient> Ingredients { get; set;}
    }
}