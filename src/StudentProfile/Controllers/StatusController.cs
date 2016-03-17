using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNet.Mvc;
using System.DirectoryServices.AccountManagement;

namespace StudentProfile.Controllers
{
    [Route("api/v1/[controller]")]
    public class StatusController : Controller
    {

        // GET: /status
        [HttpGet]
        public object Get()
        {
            var ctx = new PrincipalContext(ContextType.Domain, "stdc.edu.spbstu.ru");
            var user = UserPrincipal.FindByIdentity(ctx, User.Identity.Name);
            Debug.Assert(user != null, "user != null");

            var result = new Dictionary<string, object> {
                {"name", User.Identity.Name},
                {"displayName", user.DisplayName}
            };
            return result;
        }

    }
}
