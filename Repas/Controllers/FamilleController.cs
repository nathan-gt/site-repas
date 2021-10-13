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
            DataTable table = new DataTable();

            return new JsonResult(table);
        }
    }
}
