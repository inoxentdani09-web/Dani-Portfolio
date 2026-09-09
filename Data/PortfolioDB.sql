-- ==========================================================
-- Database: PortfolioDB
-- Target Server: (localdb)\MSSQLLocalDB or SQL Server Express
-- Entity Framework Core Compatible Schema
-- ==========================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'PortfolioDB')
BEGIN
    CREATE DATABASE [PortfolioDB];
END
GO

USE [PortfolioDB];
GO

-- 1. Table: Admins
IF OBJECT_ID(N'[dbo].[Admins]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Admins] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL DEFAULT 'Daniyal Khan',
        [Title] NVARCHAR(150) NULL DEFAULT 'Full Stack Developer',
        [Email] NVARCHAR(150) NOT NULL UNIQUE,
        [Password] NVARCHAR(255) NOT NULL DEFAULT 'admin1234',
        [Phone] NVARCHAR(50) NULL DEFAULT '+92 318 2315238',
        [Address] NVARCHAR(200) NULL DEFAULT 'Karachi, Pakistan',
        [Avatar] NVARCHAR(255) NULL DEFAULT 'profile.jpg',
        [Bio] NVARCHAR(MAX) NULL,
        [GithubUrl] NVARCHAR(255) NULL,
        [LinkedinUrl] NVARCHAR(255) NULL,
        [TwitterUrl] NVARCHAR(255) NULL,
        [FacebookUrl] NVARCHAR(255) NULL,
        [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- 2. Table: Settings
IF OBJECT_ID(N'[dbo].[Settings]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Settings] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [SiteTitle] NVARCHAR(150) NULL DEFAULT 'Daniyal | Full Stack Developer',
        [Tagline] NVARCHAR(255) NULL DEFAULT 'A Full Stack Developer Who Builds Real, Working Solutions',
        [HeroHeading] NVARCHAR(100) NULL DEFAULT 'Hi, I''m Daniyal',
        [HeroSubheading] NVARCHAR(150) NULL DEFAULT 'Full Stack Developer & Software Engineer',
        [HeroDescription] NVARCHAR(MAX) NULL,
        [AboutHeading] NVARCHAR(100) NULL DEFAULT 'Who I Am',
        [AboutDescription] NVARCHAR(MAX) NULL,
        [YearsExperience] NVARCHAR(50) NULL DEFAULT '2+',
        [CompletedProjects] INT NOT NULL DEFAULT 15,
        [HappyClients] INT NOT NULL DEFAULT 12,
        [TechnologiesCount] INT NOT NULL DEFAULT 10,
        [Email] NVARCHAR(150) NULL DEFAULT 'inoxentdani09@gmail.com',
        [Phone] NVARCHAR(50) NULL DEFAULT '+92 318 2315238',
        [Location] NVARCHAR(100) NULL DEFAULT 'Karachi, Pakistan',
        [WorkingHours] NVARCHAR(100) NULL DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
        [JazzCashNumber] NVARCHAR(50) NULL DEFAULT '0318-2315238',
        [JazzCashTitle] NVARCHAR(100) NULL DEFAULT 'Daniyal Khan',
        [EasyPaisaNumber] NVARCHAR(50) NULL DEFAULT '0318-2315238',
        [EasyPaisaTitle] NVARCHAR(100) NULL DEFAULT 'Daniyal Khan',
        [BankName] NVARCHAR(100) NULL DEFAULT 'Meezan Bank / HBL',
        [BankAccountNumber] NVARCHAR(50) NULL DEFAULT '0102-03182315238',
        [BankIban] NVARCHAR(50) NULL DEFAULT 'PK36MEZN00010203182315238',
        [BankAccountTitle] NVARCHAR(100) NULL DEFAULT 'Daniyal Khan',
        [PaymentInstructions] NVARCHAR(MAX) NULL
    );
END
GO

-- 3. Table: Skills
IF OBJECT_ID(N'[dbo].[Skills]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Skills] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [CategoryId] INT NULL,
        [CategoryName] NVARCHAR(100) NOT NULL DEFAULT 'Frontend',
        [Name] NVARCHAR(100) NOT NULL,
        [Icon] NVARCHAR(255) NULL DEFAULT 'HTML.png',
        [Level] NVARCHAR(50) NULL DEFAULT 'Advanced',
        [Proficiency] INT NOT NULL DEFAULT 90,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'Published',
        [Description] NVARCHAR(MAX) NULL,
        [CreateDate] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- 4. Table: Projects
IF OBJECT_ID(N'[dbo].[Projects]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Projects] (
        [ProjectID] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [CategoryId] INT NULL,
        [Category] NVARCHAR(100) NOT NULL DEFAULT 'E-Commerce',
        [Title] NVARCHAR(200) NOT NULL,
        [Description] NVARCHAR(MAX) NULL,
        [Image] NVARCHAR(255) NULL DEFAULT 'Project-bg.jpeg',
        [LiveDemo] NVARCHAR(255) NULL DEFAULT '#',
        [GitHub] NVARCHAR(255) NULL DEFAULT '#',
        [Technalogy] NVARCHAR(200) NULL DEFAULT 'ASP.NET Core, SQL Server',
        [IsFeatured] BIT NOT NULL DEFAULT 1,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'Published',
        [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- 5. Table: Courses
IF OBJECT_ID(N'[dbo].[Courses]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Courses] (
        [CourseID] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Title] NVARCHAR(200) NOT NULL,
        [Subtitle] NVARCHAR(255) NULL,
        [Description] NVARCHAR(MAX) NULL,
        [Category] NVARCHAR(100) NOT NULL DEFAULT 'Backend',
        [PriceType] NVARCHAR(50) NOT NULL DEFAULT 'paid',
        [Price] NVARCHAR(50) NULL DEFAULT 'PKR 3,500',
        [OriginalPrice] NVARCHAR(50) NULL DEFAULT 'PKR 6,000',
        [Duration] NVARCHAR(50) NULL DEFAULT '8 Weeks',
        [Level] NVARCHAR(50) NULL DEFAULT 'All Levels',
        [LecturesCount] NVARCHAR(50) NULL DEFAULT '36 Lectures',
        [Language] NVARCHAR(50) NULL DEFAULT 'Urdu / Hindi',
        [Rating] FLOAT NOT NULL DEFAULT 4.9,
        [EnrolledStudents] INT NOT NULL DEFAULT 120,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'Published',
        [VideoUrl] NVARCHAR(500) NULL DEFAULT 'https://www.youtube.com',
        [Syllabus] NVARCHAR(MAX) NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- 6. Table: CourseEnrollments (Relation: 1 Course -> Many Enrollments)
IF OBJECT_ID(N'[dbo].[CourseEnrollments]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[CourseEnrollments] (
        [EnrollmentID] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [CourseID] INT NOT NULL,
        [CourseTitle] NVARCHAR(200) NULL,
        [StudentName] NVARCHAR(100) NOT NULL,
        [StudentEmail] NVARCHAR(150) NOT NULL,
        [StudentPhone] NVARCHAR(50) NULL,
        [PaymentMethod] NVARCHAR(50) NOT NULL DEFAULT 'JazzCash',
        [TransactionId] NVARCHAR(100) NULL,
        [ScreenshotProof] NVARCHAR(255) NULL,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'Pending',
        [AccessCode] NVARCHAR(100) NULL,
        [EnrolledAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT [FK_CourseEnrollments_Courses_CourseID] FOREIGN KEY ([CourseID]) 
            REFERENCES [dbo].[Courses] ([CourseID]) ON DELETE CASCADE
    );
END
GO

-- 7. Table: Messages
IF OBJECT_ID(N'[dbo].[Messages]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Messages] (
        [MessageID] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL,
        [Email] NVARCHAR(150) NOT NULL,
        [Phone] NVARCHAR(50) NULL,
        [Subject] NVARCHAR(200) NOT NULL DEFAULT 'New Website Contact Inquiry',
        [MessageText] NVARCHAR(MAX) NOT NULL,
        [IsRead] BIT NOT NULL DEFAULT 0,
        [SentAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- ==========================================================
-- Initial Data Seed (Only if tables are empty)
-- ==========================================================

IF NOT EXISTS (SELECT 1 FROM [dbo].[Admins])
BEGIN
    INSERT INTO [dbo].[Admins] ([Name], [Title], [Email], [Password], [Phone], [Address], [Avatar], [Bio], [GithubUrl], [LinkedinUrl], [TwitterUrl], [FacebookUrl])
    VALUES (
        N'Daniyal Khan', 
        N'Full Stack Developer', 
        N'admin@gmail.com', 
        N'admin1234', 
        N'+92 318 2315238', 
        N'Karachi, Pakistan', 
        N'profile.jpg', 
        N'I am a Full Stack Developer specializing in React, ASP.NET MVC, .NET Core, Node.js, and SQL Server with over 2 years of proven professional experience.',
        N'https://github.com/inoxentdani09-web',
        N'https://linkedin.com/in/daniyal-developer',
        N'https://twitter.com/daniyal_dev',
        N'https://facebook.com/daniyal.dev'
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Settings])
BEGIN
    INSERT INTO [dbo].[Settings] ([SiteTitle], [Tagline], [HeroHeading], [HeroSubheading], [HeroDescription], [AboutHeading], [AboutDescription], [YearsExperience], [CompletedProjects], [HappyClients], [TechnologiesCount], [Email], [Phone], [Location], [WorkingHours], [JazzCashNumber], [JazzCashTitle], [EasyPaisaNumber], [EasyPaisaTitle], [BankName], [BankAccountNumber], [BankIban], [BankAccountTitle], [PaymentInstructions])
    VALUES (
        N'Daniyal | Full Stack Developer',
        N'A Full Stack Developer Who Builds Real, Working Solutions',
        N'Hi, I''m Daniyal',
        N'Full Stack Developer & Software Engineer',
        N'I design and develop responsive websites, dynamic web applications, and desktop software — from pixel-perfect front-end designs with HTML5, CSS3, Tailwind CSS, and React, to robust back-end systems built with ASP.NET Core, Node.js, and SQL Server.',
        N'Who I Am',
        N'I''m Daniyal, a passionate Full Stack Developer with a drive for building scalable, high-impact digital products.',
        N'2+', 15, 12, 10,
        N'inoxentdani09@gmail.com',
        N'+92 318 2315238',
        N'Karachi, Pakistan',
        N'Mon - Sat: 9:00 AM - 6:00 PM',
        N'0318-2315238', N'Daniyal Khan',
        N'0318-2315238', N'Daniyal Khan',
        N'Meezan Bank / HBL',
        N'0102-03182315238',
        N'PK36MEZN00010203182315238',
        N'Daniyal Khan',
        N'Please send course fee to any account above. After payment, enter Transaction ID (TID) and attach screenshot. Daniyal will verify and approve your course access.'
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Skills])
BEGIN
    INSERT INTO [dbo].[Skills] ([CategoryId], [CategoryName], [Name], [Icon], [Level], [Proficiency], [Status], [Description])
    VALUES
    (1, N'Frontend', N'HTML5', N'HTML.png', N'Expert', 95, N'Published', N'Semantic markup, accessibility, responsive structures.'),
    (1, N'Frontend', N'CSS3 / Tailwind', N'CSS.png', N'Expert', 92, N'Published', N'Modern flexbox, grid layouts, keyframe animations.'),
    (1, N'Frontend', N'JavaScript (ES6+)', N'JS.png', N'Advanced', 88, N'Published', N'Asynchronous programming, DOM manipulation, promises.'),
    (2, N'Backend', N'C# .NET', N'C-sharap.png', N'Advanced', 90, N'Published', N'Object-oriented architecture, LINQ, dependency injection.'),
    (2, N'Backend', N'ASP.NET Core MVC', N'ASP.NET.png', N'Advanced', 90, N'Published', N'MVC architectural patterns, RESTful APIs, EF Core ORM.'),
    (3, N'Database', N'SQL Server', N'SQL.png', N'Advanced', 85, N'Published', N'Relational schema design, normalization, stored procedures.'),
    (4, N'Tools & Desktop', N'Desktop App Dev', N'DekstopApplication.png', N'Intermediate', 80, N'Published', N'Windows Forms & WPF software development with SQL sync.');
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Projects])
BEGIN
    INSERT INTO [dbo].[Projects] ([CategoryId], [Category], [Title], [Description], [Image], [LiveDemo], [GitHub], [Technalogy], [IsFeatured], [Status])
    VALUES
    (5, N'E-Commerce', N'Full Stack E-Commerce Platform', N'A complete multi-vendor online retail store with dynamic product catalog, shopping cart, and payments.', N'Project-bg.jpeg', N'https://github.com/inoxentdani09-web', N'https://github.com/inoxentdani09-web', N'ASP.NET Core, EF Core, SQL Server, Bootstrap', 1, N'Published'),
    (6, N'Dashboard', N'Solar Energy Monitoring Dashboard', N'Real-time interactive monitoring telemetry dashboard showing energy generation and inverter efficiency.', N'Sollar.png', N'https://github.com/inoxentdani09-web', N'https://github.com/inoxentdani09-web', N'JavaScript, Chart.js, HTML5/CSS3, REST API', 1, N'Published'),
    (7, N'Portfolio', N'Personal Portfolio & CMS', N'Modern high-performance developer portfolio featuring a live CMS admin portal and course enrollment.', N'profile.jpg', N'https://github.com/inoxentdani09-web', N'https://github.com/inoxentdani09-web', N'ASP.NET Core MVC, EF Core, SQL Server, CSS3', 1, N'Published'),
    (8, N'Dekstop', N'Inventory & Billing Windows Software', N'Offline-first desktop inventory management software with invoice generator and local database backup.', N'DekstopApplication.png', N'https://github.com/inoxentdani09-web', N'https://github.com/inoxentdani09-web', N'C# WinForms, .NET Framework, SQL Server LocalDB', 1, N'Published');
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Courses])
BEGIN
    INSERT INTO [dbo].[Courses] ([Title], [Subtitle], [Description], [Category], [PriceType], [Price], [OriginalPrice], [Duration], [Level], [LecturesCount], [Language], [Rating], [EnrolledStudents], [Status], [VideoUrl], [Syllabus])
    VALUES
    (N'HTML5 & Modern CSS3 Fundamentals', N'Build responsive layouts from scratch with flexbox, grid, and CSS animations.', N'Comprehensive introductory web development masterclass focusing on building semantic, clean websites.', N'frontend', N'free', N'Free', N'Free', N'4 Weeks', N'Beginner', N'24 Lectures', N'Urdu / Hindi', 4.9, 340, N'Published', N'https://www.youtube.com', N'Module 1: HTML Semantics, Module 2: CSS Box Model, Module 3: Final Responsive Project'),
    (N'Complete ASP.NET Core MVC & EF Core Masterclass', N'Build enterprise web applications, authentication systems, and database APIs with SQL Server.', N'A complete, hands-on masterclass taking you from C# foundations to advanced ASP.NET Core MVC architectures.', N'backend', N'paid', N'PKR 3,500', N'PKR 6,000', N'8 Weeks', N'Intermediate to Advanced', N'48 Lectures', N'Urdu / Hindi', 5.0, 185, N'Published', N'https://www.youtube.com', N'Module 1: C# OOP & LINQ, Module 2: ASP.NET Core MVC Architecture, Module 3: Entity Framework Core & SQL Server'),
    (N'SQL Server & Database Design Architecture', N'Master relational schemas, stored procedures, indexing, performance tuning, and normalization.', N'Learn how real software engineers design relational database models and write secure transactions in Microsoft SQL Server.', N'database', N'paid', N'PKR 2,500', N'PKR 4,500', N'5 Weeks', N'All Levels', N'30 Lectures', N'Urdu / Hindi', 4.8, 95, N'Published', N'https://www.youtube.com', N'Module 1: Relational Modeling, Module 2: Advanced Joins, Module 3: Stored Procedures');
END
GO
