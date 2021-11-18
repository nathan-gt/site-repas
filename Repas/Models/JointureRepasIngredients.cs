using SiteRepas.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SiteSiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à la jointure 
    /// d'un plat et d'un ingrédient
    /// </summary>
    public class JointureRepasIngredients
    {
        /// <summary>
        /// Identifiant d'une jointure
        /// </summary>
        [Key]
        public int IdJointure {get; set;}
        /// <summary>
        /// Identifiant d'un repas
        /// </summary>
        [ForeignKey("FK_IdRepas")]
        public int FK_IdRepas { get; set; }

        /// <summary>
        /// Identifiant d'un ingrédient
        /// </summary>
        [ForeignKey("FK_IdIngredient")]
        public int FK_IdIngredient { get; set; }
    }
}
