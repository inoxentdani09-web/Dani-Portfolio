using Portfolio.Models;

namespace Portfolio.Data
{
    public static class DbInitializer
    {
        public static void Initialize(PortfolioDbContext context)
        {
            context.Database.EnsureCreated();

            // 1. Seed Admin
            if (!context.Admins.Any())
            {
                context.Admins.Add(new Admin
                {
                    Id = 1,
                    Name = "Daniyal Khan",
                    Title = "Full Stack Developer",
                    Email = "admin@gmail.com",
                    Password = "admin1234",
                    Phone = "+92 318 2315238",
                    Address = "Karachi, Pakistan",
                    Avatar = "profile.jpg",
                    Bio = "I am a Full Stack Developer specializing in React, ASP.NET MVC, .NET Core, Node.js, and SQL Server with over 2 years of proven professional experience building high-performance web applications, API microservices, and interactive dashboards.",
                    GithubUrl = "https://github.com/inoxentdani09-web",
                    LinkedinUrl = "https://linkedin.com/in/daniyal-developer",
                    TwitterUrl = "https://twitter.com/daniyal_dev",
                    FacebookUrl = "https://facebook.com/daniyal.dev",
                    UpdatedAt = DateTime.UtcNow
                });
            }

            // 2. Seed Settings
            if (!context.Settings.Any())
            {
                context.Settings.Add(new Settings
                {
                    Id = 1,
                    SiteTitle = "Daniyal | Full Stack Developer",
                    Tagline = "A Full Stack Developer Who Builds Real, Working Solutions",
                    HeroHeading = "Hi, I'm Daniyal",
                    HeroSubheading = "Full Stack Developer & Software Engineer",
                    HeroDescription = "I design and develop responsive websites, dynamic web applications, and desktop software — from pixel-perfect front-end designs with HTML5, CSS3, Tailwind CSS, and React, to robust back-end systems built with ASP.NET Core, Node.js, and SQL Server.",
                    AboutHeading = "Who I Am",
                    AboutDescription = "I'm Daniyal, a passionate Full Stack Developer with a drive for building scalable, high-impact digital products. On the front end, I craft clean, interactive interfaces using modern frameworks. On the back end, I architect reliable databases and secure APIs. I am open to freelance contracts and full-time remote opportunities worldwide.",
                    YearsExperience = "2+",
                    CompletedProjects = 15,
                    HappyClients = 12,
                    TechnologiesCount = 10,
                    Email = "inoxentdani09@gmail.com",
                    Phone = "+92 318 2315238",
                    Location = "Karachi, Pakistan",
                    WorkingHours = "Mon - Sat: 9:00 AM - 6:00 PM",
                    JazzCashNumber = "0318-2315238",
                    JazzCashTitle = "Daniyal Khan",
                    EasyPaisaNumber = "0318-2315238",
                    EasyPaisaTitle = "Daniyal Khan",
                    BankName = "Meezan Bank / HBL",
                    BankAccountNumber = "0102-03182315238",
                    BankIban = "PK36MEZN00010203182315238",
                    BankAccountTitle = "Daniyal Khan",
                    PaymentInstructions = "Please send course fee to any account above. After payment, enter Transaction ID (TID) and attach screenshot. Daniyal will verify and approve your course access."
                });
            }

            // 3. Seed Skills
            if (!context.Skills.Any())
            {
                context.Skills.AddRange(
                    new Skill
                    {
                        CategoryId = 1,
                        CategoryName = "Frontend",
                        Name = "HTML5",
                        Icon = "HTML.png",
                        Level = "Expert",
                        Proficiency = 95,
                        Status = "Published",
                        Description = "Semantic markup, accessibility (a11y), responsive structures, and SEO compliance.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 1,
                        CategoryName = "Frontend",
                        Name = "CSS3 / Tailwind",
                        Icon = "CSS.png",
                        Level = "Expert",
                        Proficiency = 92,
                        Status = "Published",
                        Description = "Modern flexbox, grid layouts, keyframe animations, mobile-first responsive architecture.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 1,
                        CategoryName = "Frontend",
                        Name = "JavaScript (ES6+)",
                        Icon = "JS.png",
                        Level = "Advanced",
                        Proficiency = 88,
                        Status = "Published",
                        Description = "Asynchronous programming, closures, DOM manipulation, promises, and modern API consumption.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 2,
                        CategoryName = "Backend",
                        Name = "C# .NET",
                        Icon = "C-sharap.png",
                        Level = "Advanced",
                        Proficiency = 90,
                        Status = "Published",
                        Description = "Object-oriented architecture, LINQ, dependency injection, asynchronous tasks, and data streams.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 2,
                        CategoryName = "Backend",
                        Name = "ASP.NET Core MVC",
                        Icon = "ASP.NET.png",
                        Level = "Advanced",
                        Proficiency = 90,
                        Status = "Published",
                        Description = "MVC architectural patterns, RESTful APIs, EF Core ORM, security filters, and middleware pipelines.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 3,
                        CategoryName = "Database",
                        Name = "SQL Server",
                        Icon = "SQL.png",
                        Level = "Advanced",
                        Proficiency = 85,
                        Status = "Published",
                        Description = "Relational schema design, normalization, stored procedures, indexing, and query optimization.",
                        CreateDate = DateTime.UtcNow
                    },
                    new Skill
                    {
                        CategoryId = 4,
                        CategoryName = "Tools & Desktop",
                        Name = "Desktop App Dev",
                        Icon = "DekstopApplication.png",
                        Level = "Intermediate",
                        Proficiency = 80,
                        Status = "Published",
                        Description = "Windows Forms & WPF software development with hardware interfaces and local database sync.",
                        CreateDate = DateTime.UtcNow
                    }
                );
            }

            // 4. Seed Projects
            if (!context.Projects.Any())
            {
                context.Projects.AddRange(
                    new Project
                    {
                        CategoryId = 5,
                        Category = "E-Commerce",
                        Title = "Full Stack E-Commerce Platform",
                        Description = "A complete multi-vendor online retail store with dynamic product catalog, shopping cart, order tracking, and integrated payments.",
                        Image = "Project-bg.jpeg",
                        LiveDemo = "https://github.com/inoxentdani09-web",
                        GitHub = "https://github.com/inoxentdani09-web",
                        Technalogy = "ASP.NET Core, EF Core, SQL Server, Bootstrap",
                        IsFeatured = true,
                        Status = "Published",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Project
                    {
                        CategoryId = 6,
                        Category = "Dashboard",
                        Title = "Solar Energy Monitoring Dashboard",
                        Description = "Real-time interactive monitoring telemetry dashboard showing energy generation, inverter efficiency, and battery state with charts.",
                        Image = "Sollar.png",
                        LiveDemo = "https://github.com/inoxentdani09-web",
                        GitHub = "https://github.com/inoxentdani09-web",
                        Technalogy = "JavaScript, Chart.js, HTML5/CSS3, REST API",
                        IsFeatured = true,
                        Status = "Published",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Project
                    {
                        CategoryId = 7,
                        Category = "Portfolio",
                        Title = "Personal Portfolio & CMS",
                        Description = "Modern high-performance developer portfolio featuring a live CMS admin portal, course enrollment, and lead contact forms.",
                        Image = "profile.jpg",
                        LiveDemo = "https://github.com/inoxentdani09-web",
                        GitHub = "https://github.com/inoxentdani09-web",
                        Technalogy = "ASP.NET Core MVC, EF Core, SQL Server, CSS3",
                        IsFeatured = true,
                        Status = "Published",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Project
                    {
                        CategoryId = 8,
                        Category = "Dekstop",
                        Title = "Inventory & Billing Windows Software",
                        Description = "Offline-first desktop inventory management software with invoice generator, barcode scanner integration, and local database backup.",
                        Image = "DekstopApplication.png",
                        LiveDemo = "https://github.com/inoxentdani09-web",
                        GitHub = "https://github.com/inoxentdani09-web",
                        Technalogy = "C# WinForms, .NET Framework, SQL Server LocalDB",
                        IsFeatured = true,
                        Status = "Published",
                        CreatedAt = DateTime.UtcNow
                    }
                );
            }

            // 5. Seed Courses
            if (!context.Courses.Any())
            {
                context.Courses.AddRange(
                    new Course
                    {
                        Title = "HTML5 & Modern CSS3 Fundamentals",
                        Subtitle = "Build responsive layouts from scratch with flexbox, grid, and CSS keyframe animations.",
                        Description = "Comprehensive introductory web development masterclass focusing on building semantic, clean websites with modern responsive web principles.",
                        Category = "frontend",
                        PriceType = "free",
                        Price = "Free",
                        OriginalPrice = "Free",
                        Duration = "4 Weeks",
                        Level = "Beginner",
                        LecturesCount = "24 Lectures",
                        Language = "Urdu / Hindi",
                        Rating = 4.9,
                        EnrolledStudents = 340,
                        Status = "Published",
                        VideoUrl = "https://www.youtube.com",
                        Syllabus = "Module 1: HTML Semantics, Module 2: CSS Box Model & Flexbox, Module 3: CSS Grid, Module 4: Final Responsive Project",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course
                    {
                        Title = "Complete ASP.NET Core MVC & EF Core Masterclass",
                        Subtitle = "Build enterprise web applications, authentication systems, and database APIs with SQL Server.",
                        Description = "A complete, hands-on masterclass taking you from C# object-oriented foundations to advanced ASP.NET Core MVC architectures, Entity Framework Core migrations, LINQ queries, and SQL Server deployment.",
                        Category = "backend",
                        PriceType = "paid",
                        Price = "PKR 3,500",
                        OriginalPrice = "PKR 6,000",
                        Duration = "8 Weeks",
                        Level = "Intermediate to Advanced",
                        LecturesCount = "48 Lectures",
                        Language = "Urdu / Hindi",
                        Rating = 5.0,
                        EnrolledStudents = 185,
                        Status = "Published",
                        VideoUrl = "https://www.youtube.com",
                        Syllabus = "Module 1: C# OOP & LINQ, Module 2: ASP.NET Core MVC Architecture, Module 3: Entity Framework Core & SQL Server, Module 4: Admin Dashboard & Authentication, Module 5: Deployment",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Course
                    {
                        Title = "SQL Server & Database Design Architecture",
                        Subtitle = "Master relational schemas, stored procedures, indexing, performance tuning, and normalization.",
                        Description = "Learn how real software engineers design relational database models, optimize queries, avoid bottlenecks, and write secure transactions in Microsoft SQL Server.",
                        Category = "database",
                        PriceType = "paid",
                        Price = "PKR 2,500",
                        OriginalPrice = "PKR 4,500",
                        Duration = "5 Weeks",
                        Level = "All Levels",
                        LecturesCount = "30 Lectures",
                        Language = "Urdu / Hindi",
                        Rating = 4.8,
                        EnrolledStudents = 95,
                        Status = "Published",
                        VideoUrl = "https://www.youtube.com",
                        Syllabus = "Module 1: Relational Modeling & Normalization, Module 2: Advanced Joins & Subqueries, Module 3: Stored Procedures & Triggers, Module 4: Indexing & Performance",
                        CreatedAt = DateTime.UtcNow
                    }
                );
            }

            // 6. Seed Messages
            if (!context.Messages.Any())
            {
                context.Messages.AddRange(
                    new Message
                    {
                        Name = "Muhammad Bilal",
                        Email = "bilal.tech@gmail.com",
                        Phone = "+92 300 1234567",
                        Subject = "Need Custom E-Commerce Application",
                        MessageText = "Hello Daniyal, I saw your portfolio and would like to discuss building a custom ASP.NET Core e-commerce system with SQL Server for our retail brand in Lahore.",
                        IsRead = false,
                        SentAt = DateTime.UtcNow.AddDays(-2)
                    },
                    new Message
                    {
                        Name = "Sarah Jenkins",
                        Email = "sarah.j@enterprisesoft.com",
                        Phone = "+1 415 555 0192",
                        Subject = "Full-Stack Remote Contract Opportunity",
                        MessageText = "Hi Daniyal! We have a contract position open for a Full-Stack developer experienced in C# .NET Core and modern frontend web apps. Let us know your availability.",
                        IsRead = true,
                        SentAt = DateTime.UtcNow.AddDays(-5)
                    }
                );
            }

            context.SaveChanges();
        }
    }
}
