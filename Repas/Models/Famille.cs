using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        /// Admin de la famille
        /// </summary>
        /// public ApplicationUser Admin { get; set; }

        /// <summary>
        /// Liste d'utilisateurs dans une famille
        /// </summary>
        //public ICollection<ApplicationUser> utilisateurs { get; set;}
    }
}