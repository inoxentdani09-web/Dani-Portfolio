/* =========================================================
   DANIYAL PORTFOLIO - CLIENT INTERACTIONS & SCRIPTS
   ========================================================= */

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(".animate");
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(el => el.classList.add('show'));
    }

    // Responsive Mobile/Tablet Sidebar Handling
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navLinksList = document.getElementById('navLinksList');
    const navBackdrop = document.getElementById('navBackdrop');

    function toggleSidebar() {
        if (!navLinksList) return;
        const isActive = navLinksList.classList.toggle('active');
        if (navBackdrop) {
            if (isActive) {
                navBackdrop.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                navBackdrop.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    }

    function closeSidebar() {
        if (navLinksList) navLinksList.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeSidebar);
    }

    // Auto-close sidebar when clicking any navigation link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeSidebar();
        });
    });
});

// =========================================================
// COURSE FILTERING (Free vs Paid vs Categories)
// =========================================================
function filterCourses(filterType, btnElement) {
    const filterButtons = document.querySelectorAll('.course-filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const cards = document.querySelectorAll('.course-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const priceType = (card.getAttribute('data-price-type') || '').toLowerCase();
        const category = (card.getAttribute('data-category') || '').toLowerCase();

        let show = false;
        if (filterType === 'all') {
            show = true;
        } else if (filterType === 'free') {
            show = (priceType === 'free');
        } else if (filterType === 'paid') {
            show = (priceType === 'paid');
        } else if (filterType === 'backend') {
            show = category.includes('backend') || category.includes('.net') || category.includes('c#');
        } else if (filterType === 'frontend') {
            show = category.includes('frontend') || category.includes('web');
        } else if (filterType === 'database') {
            show = category.includes('database') || category.includes('sql') || category.includes('orm');
        }

        if (show) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const counter = document.getElementById('totalCoursesCount');
    if (counter && filterType === 'all') counter.textContent = visibleCount;
}

// =========================================================
// =========================================================
// FREE COURSE READER (HTML5, CSS3, JAVASCRIPT MASTERCLASSES)
// =========================================================
const freeCourseCurriculumData = {
    // ---------------------------------------------------------
    // HTML5 FULL MASTERCLASS (8 Comprehensive In-Depth Modules)
    // ---------------------------------------------------------
    html: {
        title: "HTML5 & Modern Web Architecture (100% Free Complete Course)",
        fileExt: "html",
        modules: [
            {
                title: "Module 1: Semantic HTML5 & Modern Document Skeleton",
                desc: "Learn modern standard HTML5 document architecture. Semantic tags (<header>, <nav>, <main>, <section>, <article>, <footer>) provide accessible structure, clean code readability, and highest SEO indexing for search engines.",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daniyal Web Academy - Modern HTML5</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #0f172a; color: #f8fafc;">
  
  <header style="background: #1e293b; padding: 15px 20px; border-radius: 8px; margin-bottom: 15px;">
    <h1 style="color: #f97316; margin: 0 0 5px 0;">Daniyal Khan Tech Hub</h1>
    <nav>
      <a href="#about" style="color: #38bdf8; text-decoration: none; margin-right: 15px;">About Me</a>
      <a href="#projects" style="color: #38bdf8; text-decoration: none; margin-right: 15px;">Projects</a>
      <a href="#contact" style="color: #38bdf8; text-decoration: none;">Contact</a>
    </nav>
  </header>

  <main>
    <article style="background: #1e293b; padding: 20px; border-radius: 8px;">
      <h2 style="color: #38bdf8; margin-top: 0;">Mastering Semantic HTML5</h2>
      <p style="line-height: 1.6; color: #cbd5e1;">
        Semantic elements describe their meaning to the browser and developer, providing built-in accessibility.
      </p>
      <button style="background: #f97316; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">
        Get Started Today
      </button>
    </article>
  </main>

  <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
    &copy; 2026 Daniyal Khan. All Rights Reserved.
  </footer>

</body>
</html>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; color:#f8fafc; padding:15px; border-radius:8px;">
                        <div style="background:#1e293b; padding:12px 16px; border-radius:6px; margin-bottom:12px;">
                            <h3 style="color:#f97316; margin:0 0 4px; font-size:16px;">Daniyal Khan Tech Hub</h3>
                            <div style="font-size:12px; color:#38bdf8;">Home &bull; Projects &bull; Free Courses &bull; Contact</div>
                        </div>
                        <div style="background:#1e293b; padding:14px; border-radius:6px;">
                            <h4 style="color:#38bdf8; margin:0 0 6px; font-size:14px;">Semantic Architecture Active</h4>
                            <p style="font-size:12px; color:#cbd5e1; margin:0 0 10px;">Valid semantic layout rendered in browser engine.</p>
                            <button style="background:#f97316; color:#fff; border:none; padding:6px 14px; border-radius:4px; font-size:12px; font-weight:bold;">Interactive Button</button>
                        </div>
                    </div>
                `
            },
            {
                title: "Module 2: Typography, Headings, Lists & Text Semantics",
                desc: "Explore visual and semantic typography: Heading hierarchies (H1 to H6), ordered/unordered/description lists, blockquotes, code markup, abbreviations, and formatted emphasis (<strong>, <em>, <mark>, <del>).",
                code: `<!-- Typography and Semantic Text Elements -->
<section>
  <h1>Primary Article Title (H1)</h1>
  <h2>Section Heading (H2)</h2>
  <p>
    Enhance clarity with <strong>strong importance</strong>, <em>emphasized text</em>, 
    and <mark style="background:#fef08a; color:#000;">highlighted key terms</mark>.
  </p>
  
  <h3>Key Course Highlights (Unordered List)</h3>
  <ul>
    <li>Clean ASP.NET Core & SQL Server backend patterns</li>
    <li>Responsive CSS3 Grid & Flexbox layouts</li>
    <li>Modern ES6+ JavaScript async workflows</li>
  </ul>

  <h3>Step-by-Step Learning Path (Ordered List)</h3>
  <ol>
    <li>HTML5 Foundations</li>
    <li>CSS3 Modern Design</li>
    <li>JavaScript ES6</li>
    <li>C# & SQL Server Backend</li>
  </ol>
</section>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; color:#f8fafc; padding:15px; border-radius:8px; font-size:13px;">
                        <h4 style="color:#f97316; margin:0 0 6px;">Typography &amp; Lists Hierarchy</h4>
                        <p style="color:#cbd5e1; margin:0 0 10px;">Using <strong>strong emphasis</strong> and <span style="background:#f97316; color:#fff; padding:1px 4px; border-radius:3px;">highlighted terms</span>.</p>
                        <ul style="padding-left:18px; margin:0; color:#38bdf8;">
                            <li>ASP.NET Core &amp; SQL Server</li>
                            <li>Modern Responsive Flexbox &amp; Grid</li>
                            <li>ES6+ Asynchronous APIs</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "Module 3: Media, Images, Audio, Video & Modern SVGs",
                desc: "Integrate rich media assets with responsive srcset, HTML5 <video> with subtitles, <audio> controllers, and inline scalable vector graphics (<svg>).",
                code: `<!-- Responsive Media & Embedded Graphics -->
<figure style="margin: 0; background: #1e293b; padding: 15px; border-radius: 8px;">
  <!-- High Performance Inline SVG -->
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
  
  <figcaption style="margin-top: 8px; color: #cbd5e1; font-weight: bold;">
    Daniyal Khan's Architecture Stack
  </figcaption>
  <p style="font-size: 13px; color: #94a3b8;">
    Scalable vector icons load instantly with zero quality loss across 4K displays.
  </p>
</figure>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; color:#fff; padding:15px; border-radius:8px; display:flex; align-items:center; gap:14px;">
                        <div style="background:rgba(249,115,22,0.15); border:1px solid #f97316; padding:12px; border-radius:8px;">
                            <i class="fa-solid fa-layer-group" style="font-size:26px; color:#f97316;"></i>
                        </div>
                        <div>
                            <strong style="color:#f8fafc; font-size:14px;">SVG &amp; Media Graphics</strong>
                            <div style="color:#94a3b8; font-size:12px;">Crisp vector rendering on all display resolutions.</div>
                        </div>
                    </div>
                `
            },
            {
                title: "Module 4: Tables, Data Presentation & Accessible Grids",
                desc: "Design accessible, responsive data tables with <caption>, <thead>, <tbody>, <tfoot>, scope attributes, and financial/reporting layouts.",
                code: `<table style="width:100%; border-collapse: collapse; background:#1e293b; color:#fff; border-radius:8px; overflow:hidden;">
  <caption style="padding:8px; font-weight:bold; color:#f97316;">Full Stack Skill Breakdown</caption>
  <thead>
    <tr style="background:#0f172a; text-align:left; color:#38bdf8;">
      <th style="padding:10px; border-bottom:1px solid #334155;">Technology</th>
      <th style="padding:10px; border-bottom:1px solid #334155;">Tier</th>
      <th style="padding:10px; border-bottom:1px solid #334155;">Proficiency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px; border-bottom:1px solid #334155;">C# & ASP.NET Core</td>
      <td style="padding:10px; border-bottom:1px solid #334155;">Backend</td>
      <td style="padding:10px; border-bottom:1px solid #334155; color:#10b981;">Expert (95%)</td>
    </tr>
    <tr>
      <td style="padding:10px;">SQL Server (SSMS)</td>
      <td style="padding:10px;">Database</td>
      <td style="padding:10px; color:#10b981;">Expert (90%)</td>
    </tr>
  </tbody>
</table>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; padding:10px; border-radius:8px;">
                        <table style="width:100%; font-size:12px; border-collapse:collapse; color:#fff;">
                            <tr style="color:#f97316; border-bottom:1px solid rgba(255,255,255,0.1);"><th style="padding:6px;">Skill</th><th>Level</th><th>Status</th></tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:6px;">C# &amp; .NET Core</td><td>Backend</td><td style="color:#10b981;">95%</td></tr>
                            <tr><td style="padding:6px;">SQL Server</td><td>Database</td><td style="color:#10b981;">90%</td></tr>
                        </table>
                    </div>
                `
            },
            {
                title: "Module 5: Modern HTML5 Forms, Validation & Inputs",
                desc: "Construct enterprise-ready forms with pattern regex validation, datalists, color pickers, file uploaders, and accessible fieldsets.",
                code: `<form action="/Home/SendMessage" method="post" style="background:#1e293b; padding:20px; border-radius:8px; color:#fff;">
  <fieldset style="border:1px solid #38bdf8; border-radius:6px; padding:15px;">
    <legend style="color:#f97316; font-weight:bold; padding:0 8px;">Inquiry Details</legend>
    
    <label for="fullName" style="display:block; margin-bottom:4px; font-size:13px;">Full Name:</label>
    <input type="text" id="fullName" name="name" required placeholder="Daniyal Khan" style="width:100%; padding:8px; margin-bottom:12px; border-radius:4px; border:1px solid #475569; background:#0f172a; color:#fff;">

    <label for="email" style="display:block; margin-bottom:4px; font-size:13px;">Email Address:</label>
    <input type="email" id="email" name="email" required placeholder="admin@gmail.com" style="width:100%; padding:8px; margin-bottom:12px; border-radius:4px; border:1px solid #475569; background:#0f172a; color:#fff;">

    <button type="submit" style="background:#10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">
      Submit Inquiry
    </button>
  </fieldset>
</form>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; padding:12px; border-radius:8px; color:#fff;">
                        <input type="text" placeholder="Full Name *" style="width:100%; padding:6px 10px; margin-bottom:8px; border-radius:4px; border:1px solid #334155; background:#1e293b; color:#fff; font-size:12px;" />
                        <input type="email" placeholder="Email Address *" style="width:100%; padding:6px 10px; margin-bottom:8px; border-radius:4px; border:1px solid #334155; background:#1e293b; color:#fff; font-size:12px;" />
                        <button style="background:#10b981; color:#fff; border:none; padding:6px 14px; border-radius:4px; font-size:12px; font-weight:bold;">Test Validation</button>
                    </div>
                `
            },
            {
                title: "Module 6: HTML5 Canvas, Graphics & Web Animations",
                desc: "Render dynamic 2D animations, charts, and interactive drawings directly on the HTML5 <canvas> element using JavaScript 2D rendering contexts.",
                code: `<div style="text-align:center;">
  <canvas id="interactiveCanvas" width="280" height="120" style="background:#090d16; border:1px solid #f97316; border-radius:8px;"></canvas>
  <script>
    const canvas = document.getElementById('interactiveCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f97316';
      ctx.fillRect(20, 20, 80, 80);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(180, 60, 40, 0, Math.PI * 2);
      ctx.fill();
    }
  </script>
</div>`,
                preview: `
                    <div style="font-family:sans-serif; background:#04060c; padding:14px; border-radius:8px; text-align:center;">
                        <div style="display:inline-flex; align-items:center; gap:16px;">
                            <div style="width:50px; height:50px; background:#f97316; border-radius:6px; box-shadow:0 0 10px rgba(249,115,22,0.6);"></div>
                            <div style="width:50px; height:50px; background:#38bdf8; border-radius:50%; box-shadow:0 0 10px rgba(56,189,248,0.6);"></div>
                            <div style="width:50px; height:50px; background:#10b981; border-radius:12px; box-shadow:0 0 10px rgba(16,185,129,0.6);"></div>
                        </div>
                        <div style="color:#94a3b8; font-size:11px; margin-top:8px;">HTML5 Canvas 2D Vector Primitives</div>
                    </div>
                `
            },
            {
                title: "Module 7: SEO Optimization, Meta Tags & Web Accessibility (ARIA)",
                desc: "Master high-ranking SEO meta tags, OpenGraph cards, schema.org JSON-LD microdata, and ARIA roles (aria-live, aria-expanded, aria-label) for 100/100 Lighthouse audits.",
                code: `<!-- SEO Meta Tags & OpenGraph Protocol -->
<meta name="description" content="Daniyal Khan - Full Stack .NET & Web Developer Portfolio">
<meta name="keywords" content="C#, ASP.NET Core, SQL Server, HTML5, CSS3, JavaScript, Full Stack Developer">
<meta property="og:title" content="Daniyal Khan Portfolio & Academy">
<meta property="og:description" content="Learn web development with free and paid masterclasses.">
<meta property="og:image" content="https://daniyalkhan.dev/Images/profile.jpg">

<!-- Accessibility ARIA Roles -->
<button aria-label="Toggle Navigation Menu" aria-expanded="false" role="button">
  <span class="sr-only">Menu</span>
</button>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; padding:12px; border-radius:8px; border:1px solid #10b981;">
                        <div style="color:#10b981; font-size:12px; font-weight:bold; margin-bottom:4px;"><i class="fa-solid fa-circle-check"></i> Lighthouse SEO &amp; Accessibility Score: 100/100</div>
                        <div style="color:#94a3b8; font-size:11.5px;">Meta robots, OpenGraph preview, and WCAG AA accessibility active.</div>
                    </div>
                `
            },
            {
                title: "Module 8: Complete Full-Page Capstone Starter Template",
                desc: "A production-grade, complete HTML5 boilerplate website incorporating modern standards, semantic layout, contact form, and mobile responsiveness.",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daniyal Academy Capstone Landing Page</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #0b0f17; color: #f8fafc; margin: 0;">
  
  <header style="padding: 20px 40px; background: rgba(15, 23, 42, 0.9); display: flex; justify-content: space-between; align-items: center;">
    <h2 style="color: #f97316; margin: 0;">Daniyal Khan</h2>
    <nav>
      <a href="#about" style="color: #fff; margin-left: 20px; text-decoration: none;">About</a>
      <a href="#courses" style="color: #fff; margin-left: 20px; text-decoration: none;">Courses</a>
    </nav>
  </header>

  <section style="text-align: center; padding: 60px 20px;">
    <h1 style="font-size: 36px; margin-bottom: 10px;">Master Modern Web Engineering</h1>
    <p style="color: #94a3b8; font-size: 16px; max-width: 600px; margin: 0 auto 25px;">
      Build enterprise-grade software using C#, ASP.NET Core, Microsoft SQL Server, and Modern JavaScript.
    </p>
    <a href="#courses" style="background: #f97316; color: #fff; padding: 12px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
      Start Learning Free
    </a>
  </section>

</body>
</html>`,
                preview: `
                    <div style="font-family:sans-serif; background:#0b0f17; color:#fff; padding:20px; border-radius:8px; text-align:center;">
                        <h4 style="color:#f97316; margin:0 0 6px; font-size:16px;">Capstone Project Completed!</h4>
                        <p style="color:#cbd5e1; font-size:12px; margin:0 0 12px;">All 8 HTML5 modules mastered. Click 'Save File' to download your complete starter boilerplate.</p>
                        <button style="background:#10b981; color:#fff; border:none; padding:8px 18px; border-radius:20px; font-size:12px; font-weight:bold;">Boilerplate Ready</button>
                    </div>
                `
            }
        ]
    },

    // ---------------------------------------------------------
    // CSS3 FULL MASTERCLASS (8 Comprehensive In-Depth Modules)
    // ---------------------------------------------------------
    css: {
        title: "CSS3 Flexbox, Grid & Modern Animation Masterclass (100% Free)",
        fileExt: "css",
        modules: [
            {
                title: "Module 1: The CSS Box Model, Margins, Borders & Padding",
                desc: "Master the fundamental layout engine of the web: content box, padding box, border box, box-sizing: border-box, margin collapsing, and visual layout geometry.",
                code: `/* CSS Box Model & Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box-model-card {
  width: 100%;
  max-width: 400px;
  background: #1e293b;
  color: #f8fafc;
  padding: 24px;              /* Inner spacing */
  border: 2px solid #f97316;  /* Boundary outline */
  border-radius: 12px;
  margin: 20px auto;          /* Outer spacing */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}`,
                preview: `
                    <div style="font-family:sans-serif; background:#1e293b; border:2px solid #f97316; border-radius:8px; padding:16px; color:#fff; text-align:center;">
                        <span style="color:#f97316; font-weight:bold; font-size:13px;">Box-Sizing: border-box</span>
                        <p style="font-size:12px; color:#cbd5e1; margin:6px 0 0;">Padding + Border contained within defined width dimensions.</p>
                    </div>
                `
            },
            {
                title: "Module 2: CSS Flexbox Masterclass (1D Layouts & Alignment)",
                desc: "Master 1-dimensional layouts with flex-direction (row/column), justify-content (center, space-between, space-around), align-items, flex-wrap, and flex-grow.",
                code: `/* Modern CSS Flexbox Navigation Bar */
.flex-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 12px 24px;
  border-radius: 8px;
}

.flex-nav-brand {
  color: #f97316;
  font-weight: 800;
  font-size: 18px;
}

.flex-nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
}

.flex-nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.flex-nav-links a:hover {
  color: #f97316;
}`,
                preview: `
                    <div style="font-family:sans-serif; display:flex; justify-content:space-between; align-items:center; background:#090d16; padding:10px 14px; border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
                        <strong style="color:#f97316; font-size:13px;">Flex Brand</strong>
                        <div style="display:flex; gap:12px; font-size:12px; color:#38bdf8;">
                            <span>Home</span>
                            <span>Courses</span>
                            <span>Contact</span>
                        </div>
                    </div>
                `
            },
            {
                title: "Module 3: CSS Grid 2-Dimensional Layouts (Columns, Rows & Auto-fit)",
                desc: "Design magazine and dashboard layouts using CSS Grid: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)), gap, grid-template-areas, and alignments.",
                code: `/* Responsive 2-Dimensional Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.grid-card {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
}

.grid-card:hover {
  transform: translateY(-4px);
  border-color: #f97316;
}`,
                preview: `
                    <div style="font-family:sans-serif; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div style="background:#1e293b; border:1px solid #38bdf8; border-radius:6px; padding:10px; text-align:center; color:#38bdf8; font-size:12px; font-weight:bold;">Grid Card A</div>
                        <div style="background:#1e293b; border:1px solid #f97316; border-radius:6px; padding:10px; text-align:center; color:#f97316; font-size:12px; font-weight:bold;">Grid Card B</div>
                    </div>
                `
            },
            {
                title: "Module 4: Typography, Colors, Linear Gradients & Soft Shadows",
                desc: "Establish visual hierarchy with linear-gradient backgrounds, text shadows, backdrop-filter blur effects, and WCAG AA high-contrast typography.",
                code: `/* Premium Linear Gradients & Glassmorphism */
.gradient-banner {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #991b1b 100%);
  color: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(249, 115, 22, 0.35);
}

.glass-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}`,
                preview: `
                    <div style="font-family:sans-serif; background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; padding:16px; border-radius:8px; box-shadow:0 6px 20px rgba(249,115,22,0.4);">
                        <span style="background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:bold;">Glass Effect</span>
                        <h4 style="margin:8px 0 0; font-size:14px;">Vibrant Gradient Surface</h4>
                    </div>
                `
            },
            {
                title: "Module 5: CSS Transitions & 2D/3D Transforms",
                desc: "Add smooth fluid interactive feel to buttons and cards using transform: translateY(-5px) scale(1.02), rotate, and transition: all 0.3s cubic-bezier(...).",
                code: `/* Interactive 3D Card Hover Transition */
.interactive-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.interactive-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.3);
  border-color: #f97316;
}`,
                preview: `
                    <div style="font-family:sans-serif; text-align:center; padding:10px;">
                        <button style="background:#f97316; color:#fff; border:none; padding:10px 20px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(249,115,22,0.4); transition:all 0.2s;" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='none'">
                            Hover Over Me!
                        </button>
                    </div>
                `
            },
            {
                title: "Module 6: CSS Keyframe Animations & Glowing Effects",
                desc: "Create continuous pulse glows, subtle float loops, shimmer shines, and loading spinners with @keyframes and animation attributes.",
                code: `/* Custom Keyframe Pulse & Floating Loop */
@keyframes glowingPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(249, 115, 22, 0.8);
    transform: scale(1.04);
  }
}

.pulse-badge {
  display: inline-block;
  background: #f97316;
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 30px;
  font-weight: bold;
  animation: glowingPulse 2s infinite ease-in-out;
}`,
                preview: `
                    <div style="font-family:sans-serif; text-align:center; padding:15px;">
                        <span style="display:inline-block; background:#f97316; color:#fff; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:bold; box-shadow:0 0 15px rgba(249,115,22,0.8);">
                            <i class="fa-solid fa-fire me-1"></i> Active Glowing Pulse
                        </span>
                    </div>
                `
            },
            {
                title: "Module 7: Responsive Web Design & Mobile-First Media Queries",
                desc: "Build adaptable websites for phones, tablets, laptops, and 4K displays with @media (min-width: 768px), @media (min-width: 1024px), and viewport clamp().",
                code: `/* Mobile-First Responsive Breakpoints */
.hero-layout {
  display: flex;
  flex-direction: column; /* Mobile first: single column */
  gap: 20px;
}

@media (min-width: 768px) {
  /* Tablet & Desktop: 2-column split */
  .hero-layout {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 1200px) {
  .hero-layout {
    max-width: 1200px;
    margin: 0 auto;
  }
}`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; border:1px dashed #38bdf8; padding:12px; border-radius:6px; text-align:center;">
                        <div style="color:#38bdf8; font-size:12px; font-weight:bold;">Mobile-First Layout Tested</div>
                        <div style="color:#94a3b8; font-size:11px; margin-top:2px;">Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)</div>
                    </div>
                `
            },
            {
                title: "Module 8: CSS Custom Properties (Variables) & Theme Engines",
                desc: "Architect scalable design systems using CSS Variables (:root { --primary: #f97316; --bg: #0b0f17; }) and switch between Light/Dark themes dynamically.",
                code: `/* CSS Variables Architecture & Dark/Light System */
:root {
  --theme-bg: #0b0f17;
  --theme-surface: #111827;
  --theme-primary: #f97316;
  --theme-text: #f8fafc;
  --theme-muted: #94a3b8;
}

[data-theme="light"] {
  --theme-bg: #f8fafc;
  --theme-surface: #ffffff;
  --theme-primary: #ea580c;
  --theme-text: #0f172a;
  --theme-muted: #64748b;
}

body {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}`,
                preview: `
                    <div style="font-family:sans-serif; background:#111827; border:1px solid #f97316; border-radius:8px; padding:12px; color:#fff;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:12px; color:#f97316; font-weight:bold;">CSS Custom Properties System</span>
                            <span style="font-size:11px; background:rgba(249,115,22,0.2); padding:2px 8px; border-radius:10px;">--primary: #f97316</span>
                        </div>
                    </div>
                `
            }
        ]
    },

    // ---------------------------------------------------------
    // JAVASCRIPT ES6+ & DOM MASTERCLASS (6 Comprehensive Modules)
    // ---------------------------------------------------------
    js: {
        title: "JavaScript ES6+, DOM Manipulation & Async Engine (100% Free)",
        fileExt: "js",
        modules: [
            {
                title: "Module 1: ES6+ Modern Syntax, Arrow Functions & Destructuring",
                desc: "Learn modern JavaScript declarations (let, const), template literals, arrow functions, destructuring objects/arrays, and spread/rest operators.",
                code: `// Modern ES6+ Syntactic Patterns
const developerProfile = {
  name: 'Daniyal Khan',
  role: 'Full Stack Engineer',
  skills: ['C#', 'ASP.NET Core', 'SQL Server', 'JavaScript'],
  experienceYears: 4
};

// Object Destructuring
const { name, role, skills } = developerProfile;

// Arrow Function with Template Literals
const generateGreeting = (devName, devRole) => 
  \`Hello! I am \${devName}, working as a \${devRole}.\`;

console.log(generateGreeting(name, role));
// Output: "Hello! I am Daniyal Khan, working as a Full Stack Engineer."`,
                preview: `
                    <div style="font-family:monospace; background:#04060c; color:#10b981; padding:12px; border-radius:6px; font-size:12px;">
                        <div>&gt; JavaScript ES6+ Engine Initialized...</div>
                        <div style="color:#f97316; margin-top:4px;">Result: "Hello! I am Daniyal Khan, working as a Full Stack Engineer."</div>
                    </div>
                `
            },
            {
                title: "Module 2: DOM Manipulation, Event Listeners & Dynamic UI",
                desc: "Select elements with document.querySelector(), attach click/input event listeners, toggle CSS classes, and create DOM elements dynamically.",
                code: `// DOM Selection and Event Binding
const submitBtn = document.getElementById('contactBtn');
const alertBox = document.getElementById('alertNotification');

if (submitBtn) {
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Create notification dynamically
    const toast = document.createElement('div');
    toast.className = 'toast-alert active';
    toast.textContent = 'Message Submitted to Daniyal Khan!';
    document.body.appendChild(toast);

    setTimeout(() => { toast.remove(); }, 3000);
  });
}`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; padding:12px; border-radius:6px; text-align:center;">
                        <button onclick="this.innerText='Event Dispatched: Clicked!';" style="background:#10b981; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:12px; font-weight:bold; cursor:pointer;">
                            Click to Test DOM Event
                        </button>
                    </div>
                `
            },
            {
                title: "Module 3: Array Methods (Map, Filter, Reduce & Find)",
                desc: "Transform and filter data collections efficiently using functional array helpers: map, filter, reduce, find, some, and every.",
                code: `const portfolioProjects = [
  { id: 1, title: 'Dental Clinic ERP', category: 'fullstack', rating: 4.9 },
  { id: 2, title: 'E-Commerce Portal', category: 'dotnet', rating: 4.8 },
  { id: 3, title: 'Portfolio Website', category: 'frontend', rating: 4.7 }
];

// 1. Filter high-rated projects
const topProjects = portfolioProjects.filter(p => p.rating >= 4.8);

// 2. Map titles
const projectTitles = topProjects.map(p => p.title);

console.log(projectTitles);
// Output: ['Dental Clinic ERP', 'E-Commerce Portal']`,
                preview: `
                    <div style="font-family:monospace; background:#04060c; color:#38bdf8; padding:10px; border-radius:6px; font-size:12px;">
                        <div>&gt; Array.filter() &amp; Array.map() executed...</div>
                        <div style="color:#f97316; margin-top:2px;">[ 'Dental Clinic ERP', 'E-Commerce Portal' ]</div>
                    </div>
                `
            },
            {
                title: "Module 4: Asynchronous JavaScript (Promises, Async/Await & Fetch)",
                desc: "Master asynchronous JavaScript, REST API integration, Promise chaining, async/await syntax, and error handling with try/catch.",
                code: `// Fetch Data Asynchronously from Server
async function fetchDaniyalCourses() {
  try {
    const response = await fetch('/Home/Course');
    if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);
    
    const courses = await response.json();
    console.log('Courses Loaded:', courses);
    return courses;
  } catch (error) {
    console.error('Failed to load courses:', error.message);
  }
}

// Execute Async Function
fetchDaniyalCourses();`,
                preview: `
                    <div style="font-family:sans-serif; background:#0e1424; padding:10px; border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
                        <div style="color:#10b981; font-size:12px; font-weight:bold;"><i class="fa-solid fa-cloud-arrow-down me-1"></i> Async Fetch Ready</div>
                        <div style="color:#94a3b8; font-size:11px;">Endpoints connected to ASP.NET Core &amp; Node APIs.</div>
                    </div>
                `
            },
            {
                title: "Module 5: Browser Storage (LocalStorage, SessionStorage)",
                desc: "Persist student progress, course bookmarks, user preferences, and theme choices across browser sessions with localStorage.setItem() and getItem().",
                code: `// Save & Retrieve User Theme Preference
function saveUserTheme(themeName) {
  localStorage.setItem('daniyal_portfolio_theme', themeName);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('daniyal_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Store student enrolled course bookmark
localStorage.setItem('enrolled_html5', 'true');`,
                preview: `
                    <div style="font-family:sans-serif; background:#0f172a; padding:10px; border-radius:6px; text-align:center;">
                        <button onclick="localStorage.setItem('test_key', 'saved'); this.innerText='Stored in localStorage!';" style="background:#f97316; color:#fff; border:none; padding:6px 14px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">
                            Test LocalStorage
                        </button>
                    </div>
                `
            },
            {
                title: "Module 6: Capstone Dynamic Interactive Task & Note Manager",
                desc: "Build a complete real-world JavaScript application featuring task creation, completion toggling, localStorage persistence, and filter search.",
                code: `// Interactive Task Manager State Engine
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(title) {
    this.tasks.push({ id: Date.now(), title, completed: false });
    this.save();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.save();
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

const manager = new TaskManager();
manager.addTask('Master HTML5, CSS3 and JavaScript');`,
                preview: `
                    <div style="font-family:sans-serif; background:#0b0f17; padding:12px; border-radius:6px; border:1px solid #10b981;">
                        <div style="color:#10b981; font-weight:bold; font-size:12px;"><i class="fa-solid fa-check-circle me-1"></i> JavaScript Capstone Complete</div>
                        <div style="color:#cbd5e1; font-size:11px; margin-top:2px;">All JavaScript modules mastered. Ready to download full course source files!</div>
                    </div>
                `
            }
        ]
    }
};

let currentReaderCourseKey = 'html';
let currentReaderModuleIndex = 0;

function openFreeCourseReader(courseId) {
    let courseKey = 'html';
    if (courseId == 2 || courseId === 'css') courseKey = 'css';
    if (courseId == 3 || courseId === 'js' || courseId === 'javascript') courseKey = 'js';

    currentReaderCourseKey = courseKey;
    currentReaderModuleIndex = 0;

    const modal = document.getElementById('freeCourseReaderModal');
    if (!modal) return;

    renderReaderContent();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeFreeCourseReader() {
    const modal = document.getElementById('freeCourseReaderModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function renderReaderContent() {
    const courseData = freeCourseCurriculumData[currentReaderCourseKey] || freeCourseCurriculumData.html;
    const titleEl = document.getElementById('readerCourseTitle');
    if (titleEl) titleEl.textContent = courseData.title;

    const syllabusList = document.getElementById('readerCurriculumList');
    if (syllabusList) {
        syllabusList.innerHTML = courseData.modules.map((mod, idx) => `
            <div class="curriculum-module-item ${idx === currentReaderModuleIndex ? 'active' : ''}" style="cursor:pointer; ${idx === currentReaderModuleIndex ? 'border-color:#f97316; background:rgba(249,115,22,0.1); box-shadow:0 0 10px rgba(249,115,22,0.2);' : ''}" onclick="selectReaderModule(${idx})">
                <div class="curriculum-module-title">
                    <i class="fa-solid ${idx === currentReaderModuleIndex ? 'fa-book-open' : 'fa-file-code'} me-2" style="color:${idx === currentReaderModuleIndex ? '#f97316' : '#10b981'};"></i>
                    ${mod.title}
                </div>
            </div>
        `).join('');
    }

    const currentMod = courseData.modules[currentReaderModuleIndex] || courseData.modules[0];
    document.getElementById('readerLessonTitle').textContent = currentMod.title;
    document.getElementById('readerLessonExplanation').textContent = currentMod.desc;
    document.getElementById('readerCodeSnippet').textContent = currentMod.code;
    document.getElementById('readerLivePreview').innerHTML = currentMod.preview;
}

function selectReaderModule(index) {
    currentReaderModuleIndex = index;
    renderReaderContent();
}

function copyReaderCode() {
    const code = document.getElementById('readerCodeSnippet').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const txt = document.getElementById('copyCodeText');
        if (txt) {
            txt.textContent = 'Copied!';
            setTimeout(() => { txt.textContent = 'Copy Code'; }, 2000);
        }
    });
}

// =========================================================
// COURSE CODE DOWNLOAD ENGINE (Instant Dynamic Blob Generation)
// =========================================================
function downloadCurrentLessonCode() {
    const courseData = freeCourseCurriculumData[currentReaderCourseKey] || freeCourseCurriculumData.html;
    const currentMod = courseData.modules[currentReaderModuleIndex] || courseData.modules[0];
    const ext = courseData.fileExt || 'txt';
    const filename = `daniyal-${currentReaderCourseKey}-module-${currentReaderModuleIndex + 1}.${ext}`;
    
    const blob = new Blob([currentMod.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadFullCourseStarterPack() {
    const courseData = freeCourseCurriculumData[currentReaderCourseKey] || freeCourseCurriculumData.html;
    
    let bundledContent = `/* =========================================================================
   DANIYAL KHAN WEB ACADEMY - COMPLETE COURSE STARTER PACKAGE
   Course: ${courseData.title}
   Instructor: Daniyal Khan (Full Stack Software Engineer)
   WhatsApp: +92 318 2315238 | Email: inoxentdani09@gmail.com
   ========================================================================= */\n\n`;

    courseData.modules.forEach((mod, idx) => {
        bundledContent += `\n/* -------------------------------------------------------------------------
   ${mod.title}
   Description: ${mod.desc}
   ------------------------------------------------------------------------- */\n\n`;
        bundledContent += mod.code + "\n\n";
    });

    const ext = courseData.fileExt || 'html';
    const filename = `Daniyal-Khan-${currentReaderCourseKey.toUpperCase()}-Complete-Course-Pack.${ext}`;
    
    const blob = new Blob([bundledContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// =========================================================
// DANIYAL AI ASSISTANT & CODE MENTOR (FRONTEND CONTROLLER)
// =========================================================
let aiChatHistory = [];

function toggleAiMentorChat() {
    const panel = document.getElementById('aiChatPanel');
    if (!panel) return;
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        document.getElementById('aiChatInput')?.focus();
    } else {
        panel.style.display = 'none';
    }
}

function sendAiQuickPrompt(promptText) {
    const input = document.getElementById('aiChatInput');
    if (input) {
        input.value = promptText;
        handleAiChatSubmit(new Event('submit'));
    }
}

async function handleAiChatSubmit(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiChatSendBtn');
    const messagesBox = document.getElementById('aiChatMessages');
    
    if (!input || !input.value.trim()) return;
    const query = input.value.trim();
    input.value = '';
    
    // Append User Message
    appendAiMessage('user', query);
    
    // Append Typing Indicator
    const typingId = 'aiTypingIndicator_' + Date.now();
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-msg ai-msg-bot';
    typingEl.id = typingId;
    typingEl.innerHTML = `
        <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="ai-msg-bubble" style="color:#f97316;">
            <i class="fa-solid fa-spinner fa-spin me-2"></i> Daniyal AI is generating answer...
        </div>
    `;
    messagesBox.appendChild(typingEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    
    if (sendBtn) sendBtn.disabled = true;

    try {
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                message: query,
                history: aiChatHistory
            })
        });

        const data = await response.json();
        document.getElementById(typingId)?.remove();

        const replyText = (data && data.reply) ? data.reply : 'I am Daniyal Khan\'s AI Assistant. How can I assist you with your code or courses?';
        appendAiMessage('bot', replyText);
        
        aiChatHistory.push({ role: 'user', text: query });
        aiChatHistory.push({ role: 'model', text: replyText });
    } catch (err) {
        document.getElementById(typingId)?.remove();
        appendAiMessage('bot', 'AI Mentor is currently busy. You can also message Daniyal directly on WhatsApp: +92 318 2315238');
    } finally {
        if (sendBtn) sendBtn.disabled = false;
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }
}

function appendAiMessage(sender, text) {
    const messagesBox = document.getElementById('aiChatMessages');
    if (!messagesBox) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ${sender === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}`;
    
    // Simple markdown formatting for bold, headers and code blocks
    let formattedText = text
        .replace(/### (.*?)\n/g, '<h5 style="color:#f97316; margin:6px 0 4px; font-size:13px;">$1</h5>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:#090d16; color:#38bdf8; padding:2px 5px; border-radius:4px;">$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');

    msgEl.innerHTML = `
        <div class="ai-msg-avatar">
            <i class="fa-solid ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="ai-msg-bubble">
            ${formattedText}
        </div>
    `;

    messagesBox.appendChild(msgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

function clearAiChat() {
    aiChatHistory = [];
    const messagesBox = document.getElementById('aiChatMessages');
    if (messagesBox) {
        messagesBox.innerHTML = `
            <div class="ai-msg ai-msg-bot">
                <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="ai-msg-bubble">
                    <p><strong>Chat Cleared! 👋</strong></p>
                    <p>Ask Daniyal AI any question about HTML/CSS/JS, C#, ASP.NET Core, or SQL Server.</p>
                </div>
            </div>
        `;
    }
}

// =========================================================
// PAID COURSE ENROLLMENT MODAL (C#, ASP.NET, SQL, BOOTSTRAP, EF)
// =========================================================
const paymentAccountConfig = {
    JazzCash: {
        label: 'JAZZCASH ACCOUNT',
        number: '0318-2315238',
        title: 'Daniyal Khan'
    },
    EasyPaisa: {
        label: 'EASYPAISA ACCOUNT',
        number: '0318-2315238',
        title: 'Daniyal Khan'
    },
    'Bank Transfer': {
        label: 'BANK TRANSFER / IBAN',
        number: '0102-03182315238 (IBAN: PK36MEZN00010203182315238)',
        title: 'Daniyal Khan (Meezan / HBL)'
    }
};

let currentSelectedPaymentMethod = 'JazzCash';

function selectPaymentMethodTab(methodName) {
    currentSelectedPaymentMethod = methodName;
    const cards = document.querySelectorAll('.payment-methods-grid .payment-method-card');
    cards.forEach(c => {
        const input = c.querySelector('input[type="radio"]');
        if (input && input.value === methodName) {
            c.classList.add('active');
            input.checked = true;
        } else {
            c.classList.remove('active');
        }
    });

    const cfg = paymentAccountConfig[methodName] || paymentAccountConfig.JazzCash;
    const lbl = document.getElementById('accTypeLabel');
    const num = document.getElementById('accNumberVal');
    const ttl = document.getElementById('accTitleVal');

    if (lbl) lbl.textContent = cfg.label;
    if (num) num.textContent = cfg.number;
    if (ttl) ttl.textContent = cfg.title;
}

function copyCurrentPaymentNumber() {
    const numEl = document.getElementById('accNumberVal');
    if (!numEl) return;
    const textToCopy = numEl.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied to clipboard: ' + textToCopy);
    }).catch(() => {
        alert('Account number: ' + textToCopy);
    });
}

function handleProofScreenshotUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            document.getElementById('screenshotProofDataUrl').value = dataUrl;
            document.getElementById('screenshotPreviewImg').src = dataUrl;
            document.getElementById('screenshotPreviewBox').style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openCourseEnrollmentModal(courseId) {
    const modal = document.getElementById('courseEnrollModal');
    if (!modal) return;

    fetch(`/Home/CourseDetails?id=${courseId}`)
        .then(res => res.json())
        .then(data => {
            const course = data.course || data;
            document.getElementById('checkoutCourseId').value = course.courseID || courseId;
            document.getElementById('checkoutCourseTitle').textContent = (course.courseName || 'Full-Stack Masterclass');
            document.getElementById('checkoutCoursePrice').textContent = course.price || 'PKR 3,500';
            document.getElementById('checkoutCourseOriginal').textContent = course.originalPrice || 'PKR 6,000';
            document.getElementById('checkoutBtnPrice').textContent = course.price || 'PKR 3,500';

            // Reset form view
            document.getElementById('enrollmentCheckoutForm').style.display = 'block';
            document.getElementById('enrollmentSuccessState').style.display = 'none';

            selectPaymentMethodTab('JazzCash');

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
        .catch(err => {
            console.error('Course details fetch error:', err);
            document.getElementById('checkoutCourseId').value = courseId;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
}

function closeCourseEnrollModal() {
    const modal = document.getElementById('courseEnrollModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleCourseCheckout(e) {
    e.preventDefault();
    const courseId = document.getElementById('checkoutCourseId').value;
    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const transactionId = document.getElementById('transactionId').value;
    const screenshotProof = document.getElementById('screenshotProofDataUrl').value;
    const paymentMethod = currentSelectedPaymentMethod || 'JazzCash';

    const submitBtn = document.getElementById('btnSubmitEnrollment');
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting to Daniyal Khan...';
    submitBtn.disabled = true;

    fetch('/Home/EnrollCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            courseId: courseId,
            courseID: courseId,
            studentName,
            studentEmail,
            studentPhone,
            paymentMethod,
            transactionId,
            screenshotProof
        })
    })
    .then(res => res.json())
    .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-lock me-2"></i> Submit Application & Enroll';

        if (data.success) {
            document.getElementById('enrollmentCheckoutForm').style.display = 'none';
            document.getElementById('enrollmentSuccessState').style.display = 'block';
            
            const courseName = (data.enrollment && data.enrollment.courseName) || 'Masterclass';
            document.getElementById('successCourseName').textContent = courseName;

            // Generate WhatsApp link with prefilled message
            const waMsg = encodeURIComponent(
                `Assalam-o-Alaikum Daniyal!\nI have enrolled in: ${courseName}\nName: ${studentName}\nEmail: ${studentEmail}\nPhone: ${studentPhone}\nPayment Method: ${paymentMethod}\nTransaction ID: ${transactionId}\n\nPlease approve my course access.`
            );
            const waBtn = document.getElementById('whatsappShareBtn');
            if (waBtn) {
                waBtn.href = `https://wa.me/923182315238?text=${waMsg}`;
            }
        } else {
            alert(data.message || 'Failed to complete enrollment. Please try again.');
        }
    })
    .catch(err => {
        console.error('Checkout error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-lock me-2"></i> Submit Application & Enroll';
        alert('Application submitted! Daniyal will verify your TID.');
        document.getElementById('enrollmentCheckoutForm').style.display = 'none';
        document.getElementById('enrollmentSuccessState').style.display = 'block';
    });
}

// =========================================================
// STUDENT ACCESS LOOKUP MODAL
// =========================================================
function openStudentAccessModal() {
    const modal = document.getElementById('studentAccessModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeStudentAccessModal() {
    const modal = document.getElementById('studentAccessModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

async function checkStudentAccessStatus() {
    const query = document.getElementById('studentLookupInput')?.value.trim();
    const resultBox = document.getElementById('studentLookupResult');
    if (!query) {
        alert('Please enter your email address or Transaction ID.');
        return;
    }

    resultBox.innerHTML = '<div style="color:#f97316; font-size:13px;"><i class="fa-solid fa-spinner fa-spin me-2"></i> Verifying credentials...</div>';

    try {
        const res = await fetch(`/Home/CheckEnrollment?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.success && data.enrollments && data.enrollments.length > 0) {
            resultBox.innerHTML = data.enrollments.map(item => `
                <div style="background:#0f172a; border:1px solid ${item.status === 'Approved' ? '#10b981' : '#f59e0b'}; border-radius:10px; padding:14px; margin-bottom:10px;">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <strong style="color:#fff; font-size:14px;">${item.courseName}</strong>
                        <span class="badge" style="background:${item.status === 'Approved' ? '#10b981' : '#f59e0b'}; color:#fff; font-size:11px;">
                            ${item.status}
                        </span>
                    </div>
                    <div style="font-size:12px; color:#94a3b8;">
                        Student: <span style="color:#fff;">${item.studentName}</span> (${item.studentEmail})
                    </div>
                    <div style="font-size:12px; color:#94a3b8; margin-top:2px;">
                        Transaction ID: <code style="color:#38bdf8;">${item.transactionId || 'N/A'}</code>
                    </div>
                    ${item.status === 'Approved' ? `
                        <div style="margin-top:10px; background:rgba(16,185,129,0.1); border:1px dashed #10b981; border-radius:6px; padding:8px; display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <span style="font-size:10px; color:#10b981; font-weight:700; text-transform:uppercase;">Access Key</span>
                                <div style="font-family:monospace; font-weight:bold; color:#fff;">${item.accessKey}</div>
                            </div>
                            <button class="btn btn-sm btn-success" style="font-size:12px; font-weight:700;" onclick="openFreeCourseReader('csharp')">
                                <i class="fa-solid fa-play me-1"></i> Open Portal
                            </button>
                        </div>
                    ` : `
                        <div style="margin-top:10px; font-size:12px; color:#fbbf24; background:rgba(245,158,11,0.1); padding:8px; border-radius:6px;">
                            <i class="fa-solid fa-clock me-1"></i> Daniyal Khan is currently reviewing your payment. You will receive access key once verified.
                        </div>
                    `}
                </div>
            `).join('');
        } else {
            resultBox.innerHTML = `
                <div style="background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:8px; padding:12px; color:#fca5a5; font-size:13px;">
                    <i class="fa-solid fa-circle-exclamation me-1"></i> No application found matching "${query}". Please verify your email or contact Daniyal on WhatsApp.
                </div>
            `;
        }
    } catch (err) {
        resultBox.innerHTML = '<div style="color:#ef4444; font-size:13px;">Error looking up status. Please try again.</div>';
    }
}
