using FullStack.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FullStack.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : Controller
	{
		private readonly ApplicationDbContext _context;

		public ProductController(ApplicationDbContext context)
		{
			_context = context; //   ASP.NET Core automatically provides the context
		}
		[HttpGet]
		public ActionResult<IEnumerable<Product>> GetProducts()
		{
			return _context.Products.ToList();

		}
		[HttpGet("{id}")]
		public ActionResult<Product> GetProduct(int id)
		{
			var product = _context.Products.Find(id);
			if (product == null)
			{
				return NotFound();
			}
			return Ok(product);
		}
		[HttpPost]
		public ActionResult<Product> PostProduct(Product product)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			try
			{
				_context.Products.Add(product);
				_context.SaveChanges();
				return StatusCode(StatusCodes.Status201Created, product); // 201 Created
			}
			catch
			{
				return StatusCode(StatusCodes.Status500InternalServerError);
			}
		}
		[HttpPut("{id}")]

		public ActionResult<Product> UpdateProduct(int id, Product product)
		{

			if (id != product.Id)
			{
				return BadRequest("product IDs not match");
			}
			if (!_context.Products.Any(p => p.Id == id))
			{
				return NotFound();
			}
			try
			{
				_context.Products.Update(product);
				_context.SaveChanges();
				return Ok(product);
			}
			catch
			{
				return StatusCode(StatusCodes.Status500InternalServerError);
			}

		}
		[HttpDelete("{id}")]
     	public ActionResult DeleteProduct(int id)
		{
			var product = _context.Products.Find(id);
			if (product == null)
				return NotFound();

			try
			{
				_context.Products.Remove(product);
				_context.SaveChanges();
				return Ok();
			}
			catch
			{
				return StatusCode(StatusCodes.Status500InternalServerError);
			}
		}

	}
}
