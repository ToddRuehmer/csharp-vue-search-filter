using System;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace Xxxxx.Website2022.Models
{
    public class XxxxxAdvisor
    {
        public XxxxxAdvisor(
            string Url,
            string AdvisorFirstName,
            string AdvisorLastName,
            string Image,
            string Title,
            List<XxxxxPhoneNumber> PhoneNumbers,
            string Email,
            String[] Industrys,
            string Solutions,
            string Location
        )
        {
            this.Url = Url;
            this.AdvisorFirstName = AdvisorFirstName;
            this.AdvisorLastName = AdvisorLastName;
            this.Image = Image;
            this.Title = Title;
            this.PhoneNumbers = PhoneNumbers;
            this.Email = Email;
            this.Industrys = Industrys;
            this.Solutions = Solutions;
            this.Location = Location;
        }

        public string Url { get; set; }
        public string AdvisorFirstName { get; set; }
        public string AdvisorLastName { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public List<XxxxxPhoneNumber> PhoneNumbers { get; set; }
        public string Email { get; set; }
        public String[] Industrys { get; set; }
        public string Solutions { get; set; }
        public string Location { get; set; }
    }

    public class XxxxxPhoneNumber
    {
        public XxxxxPhoneNumber(
            string Label,
            string PhoneNumber
        )
        {
            this.Label = Label;
            this.PhoneNumber = PhoneNumber;
        }

        public string Label { get; set; }
        public string PhoneNumber { get; set; }
    }
}

