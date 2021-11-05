using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à une famille.
    /// </summary>

    public class Famille
    {
        /// <summary>
        /// Identifiant d'une famille
        /// </summary>
        [Key]
        public int Id { get; set;}

        /// <summary>
        /// Nom de la famille
        /// </summary>
        public string Nom { get; set; }

        /// <summary>
        /// Nom de la famille
        /// </summary>
        public ApplicationUser Admin { get; set; }

        /// <summary>
        /// Liste d'utilisateurs dans une famille
        /// </summary>
        public ICollection<ApplicationUser> utilisateurs { get; set;}

        /// <summary>
        /// Liste d'ingrédients dans une famille
        /// </summary>
        public ICollection<Ingredient> Ingredients { get; set;}

        /// <summary>
        /// Liste de repas dans une famille
        /// </summary>
        public ICollection<UnRepas> DesRepas { get; set;}
    }
}