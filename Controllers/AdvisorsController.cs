using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.Controllers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Umbraco.Cms.Web.Common;
using Xxxxx.Website2022.Models;
using Microsoft.Extensions.Logging.Abstractions;
using System.Collections;
using System.Text.RegularExpressions;
using System.Drawing;
using Umbraco.Extensions;
using Newtonsoft.Json.Linq;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xxxxx.Website2022.Controllers
{

    public class AdvisorsController : UmbracoApiController
    {
        private readonly UmbracoHelper _umbracoHelper;

        public AdvisorsController(UmbracoHelper umbracoHelper)
            => _umbracoHelper = umbracoHelper;

        // umbraco/api/advisors/getAdvisors
        public IActionResult getAdvisors(string topics)
        {

            List<XxxxxAdvisor> advisors = new List<XxxxxAdvisor>();

            var advisorNodes = _umbracoHelper.ContentAtXPath("//xxxxxTeamMember");

            foreach (dynamic node in advisorNodes)
            {
                List<XxxxxPhoneNumber> _numbers = new List<XxxxxPhoneNumber>();

                foreach (dynamic number in node.PhoneNumbers)
                {
                    string _label = number.Label != null ? number.Label : "";
                    string _number = number.PhoneNumber != null ? number.PhoneNumber : "";

                    _numbers.Add(
                        new XxxxxPhoneNumber(
                            _label,
                            _number
                        )
                    );
                }

                var _solutions = ((IEnumerable)node.Solution).Cast<object>().ToList();
                var _solutionsStr = "";
                foreach (var solutionsStr in _solutions)
                {
                    _solutionsStr += solutionsStr;
                }

                var _industrys = ((IEnumerable)node.IndustrySpecialization).Cast<string>().ToArray();
                for (int i = 0; i < _industrys.Length; i++)
                {
                    _industrys[i] = _industrys[i].ToLower();
                }
                var _industryStr = "";
                foreach (var industrysStr in _industrys)
                {
                    _industryStr += industrysStr;
                }

                var _locationsStr = "";
                if (node.Locations != null) {
                    foreach (var location in node.Locations)
                    {
                        var locationNode = _umbracoHelper.Content(location.Id);
                        _locationsStr += locationNode.Region.UrlSegment.Replace(" ", "-").ToLower() + ",";
                    }
                }

                var advisorImage = node.Portrait?.Content?.UmbracoFile.Src;

                IPublishedContent advisorNode = _umbracoHelper.Content(node.Id);
                string advisorUrl = advisorNode.Url();

                advisors.Add(new XxxxxAdvisor(advisorUrl, node.FirstName, node.LastName, advisorImage, node.Title, _numbers, node.EmailAddress, _industrys, _solutionsStr, _locationsStr));
            }
            advisors.Sort((x, y) => string.Compare(x.AdvisorLastName, y.AdvisorLastName));

            return new JsonResult(advisors);
        }
    }
}

