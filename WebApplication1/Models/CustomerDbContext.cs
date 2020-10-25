using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> CustDataTable { get; set; }
    }
}
