using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace SiteSiteRepas
{
    public class Utilities
    {
        private string _path = "./certificate.pfx";
        private string _password = "localhost";
        private bool _keyImported = false;
        private X509Certificate2Collection _collection = new X509Certificate2Collection();
        RSACryptoServiceProvider _privateKey;
        RSACryptoServiceProvider _publicKey;

        public Utilities()
        {
            ImportKeys();
        }

        private void ImportKeys()
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
