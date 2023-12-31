using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecom.Models
{
    public class Pizza
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        [DefaultValue("newid()")]
        public int Id { get; set; }
        public string Name { get; set; } = "Margharita";
        public int BasePrice { get; set; }
        public string Descirption { get; set; } = "Plain and basic.";
        public PizzaSize Size { get; set; } = PizzaSize.Small;
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

    }
}