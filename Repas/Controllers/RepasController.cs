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
using Microsoft.AspNetCore.JsonPatch;

namespace SiteSiteRepas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepasController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RepasController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Méthode pour l'obtention des données à l'aide d'un HTTP GET
        [HttpGet]
        public JsonResult Get()
        {
            string requete = @"
                            select * from dbo.Repas";
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

        //Méthode pour l'obtention d'un repas à l'aide d'un HTTP GET
        [HttpGet("{id}")]
        public JsonResult GetUnRepas(int id)
        {
            string requete = @"
                            select *
                            from dbo.Repas
                            where Id = " + id;
            
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
        //Méthode pour mettre des données dans la base de données
        //à l'aide d'un HTTP POST

        [HttpPost]
        public JsonResult Post(UnRepas repas)
        {
            string requete = @"
                            insert into dbo.Repas (Nom, Categorie, dateCalendrier, IdFamille, Responsable) values
                             ('" + repas.Nom + @"','" + repas.Categorie + @"','" + repas.DateCalendrier + @"','" + repas.IdFamille + @"','" + repas.Responsable + @"')";
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
            return new JsonResult("Repas ajouté avec succès.");
        }

        //Méthode pour mettre à jour un repas dans la base de données 
        //à l'aide d'un HTTP POST

        [HttpPost("{id}")]
        public JsonResult PostModif(UnRepas repas)
        {
            string requete = @"
                            UPDATE dbo.Repas
                            SET Nom = '"+repas.Nom+@"', Categorie = '"+repas.Categorie+@"', DateCalendrier = '"+repas.DateCalendrier + @"', Responsable = '"+repas.Responsable + @"'
                            WHERE Id = " + repas.Id;
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
            return new JsonResult("Repas modifié avec succès.");
        }

        //Méthode pour supprimer des données dans la base de données
        //à l'aide d'un HTTP DELETE

        [HttpDelete]
        public JsonResult Delete(UnRepas repas)
        {
            string requete = @"
                            delete from dbo.Repas where id = " + repas.Id;
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
            return new JsonResult("Repas supprimé avec succès");
        }
    }
}
