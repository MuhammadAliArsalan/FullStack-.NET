using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FullStack.Server.Models
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext()
		{
		}

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
		{ }

		public DbSet<Product> Products { get; set; }
	}
}

