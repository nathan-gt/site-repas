using System;
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
        public string Nom { get; set; }

        /// <summary>
        /// Catégorie du repas
        /// </summary>
        public string Categorie { get; set;}

        /// <summary>
        /// Date à laquelle le repas est assigné dans le calendrier
        /// </summary>
        public DateTime DateCalendrier { get; set; }

        /// <summary>
        /// Identifiant d'une famille reliée au repas
        /// </summary>
        public int IdFamille { get; set; }

        /// <summary>
        /// Responsable du repas
        /// </summary>
        public string Responsable { get; set; }
    }
}