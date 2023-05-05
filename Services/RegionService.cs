using System;
using System.Net.NetworkInformation;
using Xxxxx.Website2022.Models;
using Xxxxx2022.Services;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common;
using static Umbraco.Cms.Core.Collections.TopoGraph;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;
using Microsoft.CodeAnalysis;

namespace Xxxxx.Website2022.Services
{
    public class RegionService: IRegionService
    {
        private readonly UmbracoHelper _umbracoHelper;

        public RegionService(UmbracoHelper umbracoHelper)
            => _umbracoHelper = umbracoHelper;


        public List<RegionResult> getRegions()
        {

            List<RegionResult> regions = new List<RegionResult>();

            var regionNodes = _umbracoHelper.ContentAtXPath("//xxxxxRegion");

            IEnumerable<IPublishedContent> locationNodes = _umbracoHelper.ContentAtXPath("//xxxxxLocation1");

            foreach (IPublishedContent region in regionNodes)
            {
                var regionLocationNodes = locationNodes.Cast<XxxxxLocation1>().Where(location => location.Region?.Name == region?.Name).ToList();
                var regionLocations = new List<RegionResultLocation>();

                foreach (IPublishedContent regionLocationNode in regionLocationNodes)
                {
                    var name = regionLocationNode.Name != null ? regionLocationNode.Name : "";
                    regionLocations.Add(new RegionResultLocation(name));
                }

                if (regionLocations.Count > 0)
                {
                    regions.Add(new RegionResult(region.Name, region.UrlSegment, regionLocations));
                }
            }

            return regions;
        }
    }
}

