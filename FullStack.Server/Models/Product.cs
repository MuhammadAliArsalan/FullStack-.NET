using System.ComponentModel.DataAnnotations;

namespace FullStack.Server.Models
{
	public class Product
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Product name required")]
		[StringLength(100, ErrorMessage = "Name can't be longer than 100 characters")]
		public string Name { get; set; }

		[Required(ErrorMessage = "Product description is required")]
		[StringLength(500, ErrorMessage = "Description can't be longer than 500 characters")]
		public string Description { get; set; }

		public int Price { get; set; }
	}
}
