using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Venues
{
    public class VenuesAddRequest
    {
      
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(4000, MinimumLength =2)]
        public string Description { get; set; }
        [Required]
        public int LocationId { get; set; }
        [Required]
        public string Url { get; set; }
        public string ImageUrl { get; set; }
       
    }
}
