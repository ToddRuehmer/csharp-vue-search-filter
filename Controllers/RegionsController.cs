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
using Umbraco.Cms.Web.Common.PublishedModels;
using Xxxxx2022.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xxxxx.Website2022.Controllers
{

    public class RegionsController : UmbracoApiController
    {
        private readonly IRegionService _regionService;

        public RegionsController(IRegionService regionService)
            => _regionService = regionService;

        // umbraco/api/regions/getRegions
        public IActionResult getRegions(string topics)
        {

            List<RegionResult> regions = _regionService.getRegions();

            return new JsonResult(regions);
        }
    }
}

