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

namespace SiteSiteRepas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : Controller
    {
        private readonly IConfiguration _configuration;

        public IngredientController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string requete = @"
                            select * from dbo.Ingredients";
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

        //Méthode pour ajouter un ingrédient à la base de données
        //à l'aide d'un HTTP POST
        [HttpPost]
        public JsonResult Post(Ingredient ingredient)
        {
            string requete = @"
                            insert into dbo.Ingredients (Nom, Categorie, Disponible, FamilleId, UnRepasId) values
                             ('" + ingredient.Nom + @"','" + ingredient.Categorie + @"','" + 
                             ingredient.Disponible + @"','"+ingredient.FamilleId+@"','" + ingredient.UnRepasId+@"')";
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
            return new JsonResult("Ingredient ajouté avec succès.");
        }

        //Méthode pour mettre à jour un ingrédient dans la base de données 
        //à l'aide d'un HTTP POST

        [HttpPost("{id}")]
        public JsonResult PostModif(Ingredient ingredient)
        {
            string requete = @"
                            UPDATE dbo.Ingredients
                            SET Nom = '" + ingredient.Nom + @"', Categorie = '" + ingredient.Categorie + @"', Disponible = '" + ingredient.Disponible + @"'
                            WHERE Id = " + ingredient.Id;
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
            return new JsonResult("Ingrédient modifié avec succès.");
        }

        //Méthode pour supprimer des données dans la base de données
        //à l'aide d'un HTTP DELETE

        [HttpDelete]
        public JsonResult Delete(Ingredient ingredient)
        {
            string requete = @"
                            delete from dbo.Ingredients where id = " + ingredient.Id;
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
            return new JsonResult("Ingredient supprimé avec succès");
        }
    }
}
