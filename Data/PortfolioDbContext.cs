using DaniPortfolio.Models;
using Microsoft.EntityFrameworkCore;

namespace DaniPortfolio.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
        {

        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Message> Messages { get; set; }

    }
}
