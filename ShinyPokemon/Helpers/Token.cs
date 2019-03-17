﻿using Newtonsoft.Json;
using ShinyPokemon.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShinyPokemon.Helpers
{
    public class Token
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, JwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}
