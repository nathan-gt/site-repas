using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace SiteRepas
{
    public static class Utilities
    {
        /* private string _path = "./certificate.pfx";
        private string _password = "localhost";
        private bool _keyImported = false;
        private X509Certificate2Collection _collection = new X509Certificate2Collection();
        RSACryptoServiceProvider _privateKey;
        RSACryptoServiceProvider _publicKey;*/

        public static string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null) {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8)) {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        /// <summary>
        /// Get current user id
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Current connected User Id, null if none found</returns>
        public static string SubjectId(this ClaimsPrincipal user) { return user?.Claims?.FirstOrDefault(c => c.Type.Equals("sub", StringComparison.OrdinalIgnoreCase))?.Value; }

        /// <summary>
        /// Send a request to the database to request all fields associated with given users
        /// </summary>
        /// <param name="id">UserIds</param>
        /// <param name="connectionString">ConnectionString to db</param>
        /// <returns></returns>
        public static DataTable GetInfoUsers(string[] ids, string connectionString)
        {
            string requete = "SELECT * FROM dbo.AspNetUsers WHERE Id IN ('" + string.Join("', '", ids) + "')";
            DataTable table = new DataTable();
            string sqlDataSource = connectionString;
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

            table.PrimaryKey = new DataColumn[] { table.Columns["Id"] }; // Specify the primary key (for some reason it doesn't do that already)
            return table;
        }

        /* private void ImportKeys()
        {
            if(!_keyImported) 
            {
                _collection.Import(_path, _password, X509KeyStorageFlags.PersistKeySet);
                _publicKey = _collection[0].PublicKey.Key as RSACryptoServiceProvider;
                _privateKey = _collection[0].PrivateKey as RSACryptoServiceProvider;
                _keyImported = true;
            }
        }

        public byte[] Decrypt(byte[] data)
        {
            return _privateKey.Decrypt(data, false);
        }

        public byte[] Encrypt(byte[] data)
        {
            return _publicKey.Encrypt(data, false);
        }

        /*async Task<string> string UserInfo()
        {
            var client = new HttpClient();

            var response = await client.GetUserInfoAsync(new UserInfoRequest {
                Address = disco.UserInfoEndpoint,
                Token = token
            });
            return response;
        }*/
    }
}
