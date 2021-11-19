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
    public class JointureController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public JointureController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Méthode pour l'obtention des ingrédients d'un repas à l'aide d'un HTTP GET
        //ou l'id est celui du repas
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string requete = @"SELECT * 
                                FROM Ingredients
                                INNER JOIN Repas ON " + id + " = Repas.Id";

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

        //Méthode pour mettre à jour un ingrédient dans la base de données 
        //à l'aide d'un HTTP POST

        [HttpPost("{id}")]
        public JsonResult PostModif(Ingredient ingredient)
        {
            string requete = @"
                            UPDATE dbo.Ingredients
                            SET Disponible = '" + ingredient.Disponible + @"'
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
    }
}
