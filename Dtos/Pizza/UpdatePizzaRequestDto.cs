using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecom.Dtos.PizzaDto
{
    public class UpdatePizzaRequestDto
    {

        public int Id { get; set; }
        public string Name { get; set; } = "Margharita";
        public int BasePrice { get; set; }
        public string Descirption { get; set; } = "Plain and basic.";
        public List<Ingredient> Ingredients { get; set; }
        public PizzaSize Size { get; set; } = PizzaSize.Small;
    }
}