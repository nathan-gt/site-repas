using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using SiteRepas.Models;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using static SiteRepas.Utilities;


namespace SiteSiteRepas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Gets invited famille of currently connected user
        /// </summary>
        /// <returns>Famille</returns>
        [HttpGet("current/invite")]
        public IActionResult GetCurrentInvite()
        {
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }
            string requete = @"
                SELECT * FROM dbo.Familles 
                WHERE Id = 
                    (SELECT FamilleInviteId 
                    FROM dbo.AspNetUsers 
                    WHERE Id = '" + connectedUserId + "')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(requete, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        /// <summary>
        /// Crée une invitation à une famille si le user visé n'a pas d'invitation déjà et
        /// le user envoyant la requête fait partie de la famille de l'invitation
        /// </summary>
        /// <param name="familleNom"></param>
        /// <returns></returns>
        [HttpPatch("invite/{idUser}")]
        public IActionResult CreateInvite(string idUser, int? idFamille)
        {
            if (idFamille == null) {
                return BadRequest();
            }
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            DataTable infoUsers = GetInfoUsers(new string[] { connectedUserId }, sqlDataSource);
            var connectedUserFID = infoUsers.Rows.Find(connectedUserId).Field<int?>("FamilleId");

            if (connectedUserFID != idFamille) { // user connecté est en train de faire une demande pour une autre famille
                return Unauthorized();
            }

            string requete = @"
                                UPDATE dbo.AspNetUsers SET FamilleInviteId = " + idFamille + @"
                                WHERE Id = '" + idUser + "' AND FamilleInviteId is NULL";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(requete, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return Ok();
        }

        /// <summary>
        /// Remet l'idInvite du user connecté à NULL
        /// </summary>
        /// <param name="familleNom"></param>
        /// <returns></returns>
        [HttpDelete("invite/")]
        public IActionResult DeleteInvite()
        {
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            string requete = @"
                                UPDATE dbo.AspNetUsers SET FamilleInviteId = NULL
                                WHERE Id = '" + connectedUserId + "'";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(requete, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return NoContent();
        }

        /// <summary>
        /// Remet l'idInvite du user connecté à NULL
        /// </summary>
        /// <param name="familleNom"></param>
        /// <returns></returns>
        [HttpPatch("invite")]
        public IActionResult GetInvite()
        {
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            DataTable infoUsers = GetInfoUsers(new string[] { connectedUserId }, sqlDataSource);

            string requete = @"
                                UPDATE dbo.AspNetUsers SET FamilleInviteId = NULL
                                WHERE Id = '" + connectedUserId + "'";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(requete, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return NoContent();
        }

        /// <summary>
        /// Makes connected user join the family he is invited to and removes his then used invite
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public IActionResult AddUserToInvitedFamily()
        {
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }

            string requete = @"
                            UPDATE dbo.AspNetUsers 
                            SET FamilleId = FamilleInviteId, FamilleInviteId = NULL 
                            WHERE Id = '" + connectedUserId + "' AND FamilleInviteId is not NULL";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(requete, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return Ok();
        }

    }
}
