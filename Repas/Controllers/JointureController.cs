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
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string requete = @"
                            select Id, Nom, Categorie, DateCalendrier, FamilleId 
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
    }
}
