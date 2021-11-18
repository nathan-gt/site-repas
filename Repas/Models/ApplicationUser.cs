﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteRepas.Models
{
    /// <summary>
    /// Modèle servant à stocker les informations se rapportant à un utilisateur.
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        //À faire, je ne sais pas si ça va faire planter l'authentification déjà en place
        /// <summary>
        /// famille associé au compte
        /// </summary>
        public Famille Famille { get; set; }

        /// <summary>
        /// Si User est admin de sa famille
        /// </summary>
        public bool IsAdminFamille { get; set; }
    }
}
