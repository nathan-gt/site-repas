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

        //Retourne la famille d'un user GET
        [HttpGet("byUserId/{id}")]
        public JsonResult GetFamilleOfUser(string id)
        {
            string requete = @"
            SELECT f.*, u.Email, u.UserName, u.FamilleId, u.Id
            FROM dbo.AspNetUsers u
            INNER JOIN dbo.Familles f ON 
            (SELECT u.FamilleId FROM dbo.AspNetUsers u WHERE u.Id = '" + id + "') = u.FamilleId";
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

        [HttpPost]
        public JsonResult Post(Famille famile)
        {
            string requete = @"
                            insert into dbo.Familles (Nom) values
                             ('" + famile.Nom + @"')";
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
            return new JsonResult("Famille ajouté avec succès.");
        }

        //Méthode pour mettre à jour une famille dans la base de données 
        //à l'aide d'un HTTP POST

        [HttpPost("{id}")]
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
            return new JsonResult("Famille modifié avec succès.");
        }

        //Méthode pour supprimer des données dans la base de données
        //à l'aide d'un HTTP DELETE

        [HttpDelete]
        public JsonResult Delete(Famille famille)
        {
            string requete = @"
                            delete from dbo.Familles where id = " + famille.Id;
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
            return new JsonResult("Famille supprimé avec succès");
        }
    }
}
