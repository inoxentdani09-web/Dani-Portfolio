using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(
            DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        // =====================================================
        // DATABASE TABLES
        // =====================================================

        public DbSet<Admin> Admins { get; set; } = null!;

        public DbSet<Skill> Skills { get; set; } = null!;

        public DbSet<Project> Projects { get; set; } = null!;

        public DbSet<Course> Courses { get; set; } = null!;

        public DbSet<CourseEnrollment> CourseEnrollments { get; set; } = null!;

        public DbSet<Message> Messages { get; set; } = null!;

        public DbSet<Settings> Settings { get; set; } = null!;


        // =====================================================
        // MODEL CONFIGURATION
        // =====================================================

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // =================================================
            // TABLE NAMES
            // =================================================

            modelBuilder.Entity<Admin>()
                .ToTable("Admins");

            modelBuilder.Entity<Skill>()
                .ToTable("Skills");

            modelBuilder.Entity<Project>()
                .ToTable("Projects");

            modelBuilder.Entity<Course>()
                .ToTable("Courses");

            modelBuilder.Entity<CourseEnrollment>()
                .ToTable("CourseEnrollments");

            modelBuilder.Entity<Message>()
                .ToTable("Messages");

            modelBuilder.Entity<Settings>()
                .ToTable("Settings");


            // =================================================
            // PRIMARY KEYS
            // =================================================

            modelBuilder.Entity<Admin>()
                .HasKey(a => a.Id);

            modelBuilder.Entity<Skill>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<Project>()
                .HasKey(p => p.ProjectID);

            modelBuilder.Entity<Course>()
                .HasKey(c => c.CourseID);

            modelBuilder.Entity<CourseEnrollment>()
                .HasKey(e => e.EnrollmentID);

            modelBuilder.Entity<Message>()
                .HasKey(m => m.MessageID);

            modelBuilder.Entity<Settings>()
                .HasKey(s => s.Id);


            // =================================================
            // COURSE ENROLLMENT RELATIONSHIP
            // Course -> Many CourseEnrollments
            // =================================================

            modelBuilder.Entity<CourseEnrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseID)
                .OnDelete(DeleteBehavior.Cascade);


            // =================================================
            // ADMIN EMAIL UNIQUE
            // =================================================

            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Email)
                .IsUnique();


            // =================================================
            // COURSE CONFIGURATION
            // =================================================

            modelBuilder.Entity<Course>()
                .Property(c => c.Title)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<Course>()
                .Property(c => c.Subtitle)
                .HasMaxLength(255);

            modelBuilder.Entity<Course>()
                .Property(c => c.Category)
                .HasMaxLength(100);

            modelBuilder.Entity<Course>()
                .Property(c => c.PriceType)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.Price)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.OriginalPrice)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.Duration)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.Level)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.LecturesCount)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.Language)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.Status)
                .HasMaxLength(50);

            modelBuilder.Entity<Course>()
                .Property(c => c.VideoUrl)
                .HasMaxLength(500);


            // =================================================
            // PLATFORM
            // Database Courses table already has Platform
            // =================================================

            modelBuilder.Entity<Course>()
                .Property(c => c.Platform)
                .HasMaxLength(100)
                .IsRequired();


            // =================================================
            // CREATED DATE
            // =================================================

            modelBuilder.Entity<Course>()
                .Property(c => c.CreatedAt)
                .HasColumnName("CreatedDate");


            // =================================================
            // COURSE ENROLLMENT
            // =================================================

            modelBuilder.Entity<CourseEnrollment>()
                .Property(e => e.CourseID)
                .IsRequired();
        }
    }
}