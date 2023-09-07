using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecom.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Name { get; set; } = "Margharita";
        public int BasePrice { get; set; }
        public string Descirption { get; set; } = "Plain and basic.";
        public List<string> Ingredients { get; set; }
        public PizzaSize Size { get; set; } = PizzaSize.Small;
    }
}