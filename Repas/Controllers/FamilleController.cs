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
    public class FamilleController : Controller
    {
        private readonly IConfiguration _configuration;

        public FamilleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Méthode pour l'obtention des données à l'aide de la méthode GET
        [HttpGet]
        public JsonResult Get()
        {
            string requete = @"
                            select Id, Nom from dbo.Familles";
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

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string requete = @"
                            SELECT *
                            FROM dbo.Familles
                            WHERE Id = '" + id + "'";
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

        //Retourne la famille+users d'un user GET
        [HttpGet("byUserId/{id}")]
        public JsonResult GetFamilleOfUser(string id)
        {
            string requete = @"
            SELECT u.Id, u.Username, u.IsAdminFamille, u.FamilleId, f.Nom AS FamilleNom
            FROM AspNetUsers u INNER JOIN dbo.Familles f ON u.FamilleId = f.Id
            WHERE f.Id = (SELECT u.FamilleId FROM dbo.AspNetUsers u WHERE u.Id = '" + id + "')";
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
        /// Crée une famille avec familleNom et attribue le user connecté à celle-ci, si user n'a pas de famille
        /// </summary>
        /// <param name="familleNom"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(string familleNom)
        {
            if (string.IsNullOrEmpty(familleNom)) {
                return BadRequest();
            }

            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (connectedUserId == null) {
                return Unauthorized();
            }

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            DataTable infoUsers = GetInfoUsers(new string[] { connectedUserId }, sqlDataSource);

            if (infoUsers.Rows.Find(connectedUserId).Field<int?>("FamilleId") != null) { // User a déjà une famille
                return Unauthorized();
            }

            string requete = @"
                            INSERT INTO dbo.Familles (Nom) VALUES ('" + familleNom + @"');
                            UPDATE dbo.AspNetUsers 
                            SET IsAdminFamille = 1, FamilleId = (SCOPE_IDENTITY())
                            WHERE Id = '" + connectedUserId + "';";
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
            return new JsonResult("Famille ajoutée avec succès.");
        }

        //Méthode pour mettre à jour une famille dans la base de données 
        //à l'aide d'un HTTP POST

        [HttpPut("{id}")]
        public JsonResult PostModif(Famille famille)
        {
            string requete = @"
                            UPDATE dbo.Familles
                            SET Nom = '" + famille.Nom + @"'
                            WHERE Id = " + famille.Id;
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
            return new JsonResult("Famille supprimée avec succès");
        }


        [HttpPatch("removeFromFamily/{id}")]
        public IActionResult RemoveUserFromFamily(string id)
        {
            string connectedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            string requete;

            if(connectedUserId == null) {
                return Unauthorized();
            }

            if (connectedUserId == id) { // User requesting to leave their own family
                requete = @"
                         UPDATE AspNetUsers
                         SET FamilleId = NULL, IsAdminFamille = 0
                         WHERE Id = '" + id + "'";
            }
            else { // the admin of the family is the one requesting
                DataTable infoUsers = GetInfoUsers(new string[]{connectedUserId , id }, _configuration.GetConnectionString("DefaultConnection"));

                if(infoUsers.Rows.Count < 2) {
                    return NotFound();
                }

                bool isAdmin = infoUsers.Rows.Find(connectedUserId).Field<bool>("IsAdminFamille");
                int familleId_A = infoUsers.Rows.Find(connectedUserId).Field<int>("FamilleId");
                int familleId_B = infoUsers.Rows.Find(id).Field<int>("FamilleId");

                if (isAdmin && familleId_A == familleId_B) {
                    requete = @"
                         UPDATE AspNetUsers
                         SET FamilleId = NULL
                         WHERE Id = '" + id + "'";
                }
                else {
                    return NoContent();
                }
            }


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
            return new JsonResult("Famille modifiée avec succès.");
        }

        //Méthode pour supprimer des données dans la base de données
        //à l'aide d'un HTTP DELETE

        [HttpDelete]
        public JsonResult Delete(int familleId)
        {
            string requete = @"
                            UPDATE dbo.AspNetUsers 
                            SET FamilleId = NULL, FamilleInviteId = NULL 
                            WHERE FamilleId = "+ familleId +  @";  
                            DELETE FROM dbo.Familles WHERE id = " + familleId + ";";
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
            return new JsonResult("Famille supprimée avec succès");
        }

    }
}