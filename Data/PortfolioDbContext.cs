using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; } = null!;
        public DbSet<Skill> Skills { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<CourseEnrollment> CourseEnrollments { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<Settings> Settings { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Table mappings
            modelBuilder.Entity<Admin>().ToTable("Admins");
            modelBuilder.Entity<Skill>().ToTable("Skills");
            modelBuilder.Entity<Project>().ToTable("Projects");
            modelBuilder.Entity<Course>().ToTable("Courses");
            modelBuilder.Entity<CourseEnrollment>().ToTable("CourseEnrollments");
            modelBuilder.Entity<Message>().ToTable("Messages");
            modelBuilder.Entity<Settings>().ToTable("Settings");

            // Course 1 -> Many CourseEnrollments Relationship
            modelBuilder.Entity<CourseEnrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseID)
                .OnDelete(DeleteBehavior.Cascade);

            // Primary Keys & Indexes
            modelBuilder.Entity<Admin>().HasKey(a => a.Id);
            modelBuilder.Entity<Skill>().HasKey(s => s.Id);
            modelBuilder.Entity<Project>().HasKey(p => p.ProjectID);
            modelBuilder.Entity<Course>().HasKey(c => c.CourseID);
            modelBuilder.Entity<CourseEnrollment>().HasKey(e => e.EnrollmentID);
            modelBuilder.Entity<Message>().HasKey(m => m.MessageID);
            modelBuilder.Entity<Settings>().HasKey(s => s.Id);

            modelBuilder.Entity<Admin>().HasIndex(a => a.Email).IsUnique();
        }
    }
}
