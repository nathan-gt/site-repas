using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

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
                            select Nom, Id, Categorie, Disponible from dbo.Ingredients";
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
    }
}
