using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SiteSiteRepas.Models
{
    public class JointureRepasIngredients
    {

        [ForeignKey("UnRepas")]
        public int RepasId { get; set; }
        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }
    }
}
