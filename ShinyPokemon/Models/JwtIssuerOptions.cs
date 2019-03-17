using System;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace ShinyPokemon.Models
{
    public class JwtIssuerOptions
    {
        //Defining some of the claim properties which generated tokens will contain
        
        /// 4.1.1.  "iss" (Issuer) Claim - The "iss" (issuer) claim identifies the principal that issued the JWT
        public string Issuer { get; set; }
        
        /// 4.1.2.  "sub" (Subject) Claim - The "sub" (subject) claim identifies the principal that is the subject of the JWT
        public string Subject { get; set; }
        
        /// 4.1.3.  "aud" (Audience) Claim - The "aud" (audience) claim identifies the recipients that the JWT is intended for
        public string Audience { get; set; }

        /// 4.1.4.  "exp" (Expiration Time) Claim - The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing
        public DateTime Expiration => IssuedAt.Add(ValidFor);
        
        /// 4.1.5.  "nbf" (Not Before) Claim - The "nbf" (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing
        public DateTime NotBefore => DateTime.UtcNow;
        
        /// 4.1.6.  "iat" (Issued At) Claim - The "iat" (issued at) claim identifies the time at which the JWT was issued
        public DateTime IssuedAt => DateTime.UtcNow;
        
        /// Set the timespan the token will be valid for (default is 120 min)
        public TimeSpan ValidFor { get; set; } = TimeSpan.FromMinutes(120);
        
        /// "jti" (JWT ID) Claim (default ID is a GUID)
        public Func<Task<string>> JtiGenerator => () => Task.FromResult(Guid.NewGuid().ToString());
        
        /// The signing key to use when generating tokens
        public SigningCredentials SigningCredentials { get; set; }
    }
}
