using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à un utilisateur.
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
        /// famille associé au compte
        /// </summary>
        [ForeignKey("FamilleId")]
        public Famille Famille { get; set; }

        /// <summary>
        /// famille ayant envoyé une invitation à un compte
        /// </summary>
        public Famille FamilleInvite { get; set; }

        /// <summary>
        /// Si User est admin de sa famille
        /// </summary>
        public bool IsAdminFamille { get; set; }
    }
}
