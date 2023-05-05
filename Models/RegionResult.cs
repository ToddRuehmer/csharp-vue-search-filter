using System;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace Xxxxx.Website2022.Models
{
    public class RegionResult
    {
        public RegionResult(
            string Name,
            string Alias,
            List<RegionResultLocation>? Locations
        )
        {
            this.Name = Name;
            this.Alias = Alias;
            this.Locations = Locations;
        }

        public string Name { get; set; }
        public string Alias { get; set; }
        public List<RegionResultLocation> Locations { get; set; }
    }

    public class RegionResultLocation
    {
        public RegionResultLocation(
            string Name
        )
        {
            this.Name = Name;
        }

        public string Name { get; set; }
    }
}

