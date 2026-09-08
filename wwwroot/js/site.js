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
// FREE COURSE READER (HTML, CSS, JAVASCRIPT)
// =========================================================
const freeCourseCurriculumData = {
    // HTML5 Course
    html: {
        title: "HTML5 & Modern Web Development (100% Free)",
        modules: [
            {
                title: "Module 1: Semantic HTML & Document Architecture",
                desc: "Learn to structure clean, accessible, and SEO-optimized HTML documents using modern semantic tags.",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Modern Website</title>
</head>
<body>
  <header>
    <h1>Welcome to Daniyal Web Academy</h1>
    <nav>
      <a href="#about">About</a> | <a href="#courses">Courses</a>
    </nav>
  </header>
  <main>
    <article>
      <h2>Learn Web Development for Free</h2>
      <p>HTML5 provides rich semantic tags like &lt;header&gt;, &lt;article&gt;, and &lt;section&gt;.</p>
      <button style="background:#f97316;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Click Me!</button>
    </article>
  </main>
</body>
</html>`,
                preview: `
                    <div style="font-family:sans-serif; padding:10px; background:#fff; color:#111827; border-radius:6px;">
                        <h2 style="color:#f97316; margin:0 0 6px;">Welcome to Daniyal Web Academy</h2>
                        <nav style="font-size:13px; color:#6b7280; margin-bottom:12px;"><a href="#" style="color:#f97316;">Home</a> &bull; <a href="#" style="color:#f97316;">Courses</a></nav>
                        <p style="font-size:14px; margin:0 0 10px;">HTML5 provides semantic tags for cleaner structure, accessibility, and high Google search ranking.</p>
                        <button style="background:#f97316; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">Interactive Button</button>
                    </div>
                `
            },
            {
                title: "Module 2: HTML Forms, Inputs & Validations",
                desc: "Design user-friendly forms with inputs, datalists, validation attributes (required, pattern), and accessibility labels.",
                code: `<form action="/submit" method="post">
  <label for="username">Full Name:</label>
  <input type="text" id="username" name="name" required placeholder="Daniyal Khan">
  
  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email" required placeholder="admin@gmail.com">
  
  <input type="submit" value="Register Now">
</form>`,
                preview: `
                    <div style="font-family:sans-serif; padding:10px; background:#fff; color:#111827; border-radius:6px;">
                        <h4 style="margin:0 0 10px; color:#111;">HTML5 Form Preview</h4>
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <input type="text" placeholder="Enter Full Name" style="padding:6px; border:1px solid #ccc; border-radius:4px; font-size:13px;" />
                            <input type="email" placeholder="Enter Email" style="padding:6px; border:1px solid #ccc; border-radius:4px; font-size:13px;" />
                            <button style="background:#10b981; color:#fff; border:none; padding:8px; border-radius:4px; font-weight:bold; cursor:pointer;">Submit Form</button>
                        </div>
                    </div>
                `
            }
        ]
    },
    // CSS3 Course
    css: {
        title: "CSS3 Flexbox, Grid & Modern Styling (100% Free)",
        modules: [
            {
                title: "Module 1: CSS Flexbox & Responsive Layouts",
                desc: "Master 1-dimensional layouts with flex-direction, justify-content, align-items, and gap properties.",
                code: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: #111827;
  padding: 20px;
  border-radius: 12px;
}
.card {
  flex: 1;
  background: #f97316;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}`,
                preview: `
                    <div style="display:flex; gap:10px; font-family:sans-serif;">
                        <div style="flex:1; background:#f97316; color:#fff; padding:12px; border-radius:6px; text-align:center; font-weight:bold;">Flex Item 1</div>
                        <div style="flex:1; background:#3b82f6; color:#fff; padding:12px; border-radius:6px; text-align:center; font-weight:bold;">Flex Item 2</div>
                        <div style="flex:1; background:#10b981; color:#fff; padding:12px; border-radius:6px; text-align:center; font-weight:bold;">Flex Item 3</div>
                    </div>
                `
            },
            {
                title: "Module 2: CSS Grid 2-Dimensional Layouts",
                desc: "Create complex dashboard and magazine layouts with grid-template-columns and responsive repeat(auto-fit, minmax(...)).",
                code: `.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
                preview: `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-family:sans-serif;">
                        <div style="background:#0e1424; color:#38bdf8; border:1px solid #38bdf8; padding:10px; border-radius:6px; text-align:center;">Grid Column 1</div>
                        <div style="background:#0e1424; color:#a855f7; border:1px solid #a855f7; padding:10px; border-radius:6px; text-align:center;">Grid Column 2</div>
                    </div>
                `
            }
        ]
    },
    // JavaScript Course
    js: {
        title: "JavaScript ES6+ & DOM Manipulation (100% Free)",
        modules: [
            {
                title: "Module 1: Variables, Arrow Functions & Array Methods",
                desc: "Learn modern ES6+ syntax including let, const, template literals, destructuring, map, filter, and reduce.",
                code: `// Modern ES6 Array Filtering & Mapping
const developers = [
  { name: 'Daniyal', role: 'Full Stack', experience: 4 },
  { name: 'Sarah', role: 'Frontend', experience: 2 },
  { name: 'Hamza', role: 'Backend', experience: 5 }
];

const seniorDevs = developers
  .filter(dev => dev.experience >= 4)
  .map(dev => \`\${dev.name} - \${dev.role}\`);

console.log(seniorDevs);
// Output: ["Daniyal - Full Stack", "Hamza - Backend"]`,
                preview: `
                    <div style="font-family:monospace; background:#04060c; color:#10b981; padding:12px; border-radius:6px; font-size:12px;">
                        <div>&gt; Array.prototype.filter() executed...</div>
                        <div style="color:#f97316; margin-top:4px;">Result: ["Daniyal - Full Stack", "Hamza - Backend"]</div>
                    </div>
                `
            },
            {
                title: "Module 2: Async/Await & Fetch API",
                desc: "Consume REST APIs asynchronously with async/await, error handling (try/catch), and JSON parsing.",
                code: `async function loadPortfolioProjects() {
  try {
    const response = await fetch('/Home/ProjectDetails?id=1');
    const project = await response.json();
    console.log('Project Loaded:', project.title);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`,
                preview: `
                    <div style="font-family:sans-serif; background:#0e1424; padding:10px; border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
                        <button onclick="this.textContent='Data Fetched: Status 200 OK!';" style="background:#3b82f6; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer;">
                            Test async/await API Call
                        </button>
                    </div>
                `
            }
        ]
    }
};

let currentReaderCourseKey = 'html';
let currentReaderModuleIndex = 0;

function openFreeCourseReader(courseId) {
    // Determine key based on ID or course name
    let courseKey = 'html';
    if (courseId == 2) courseKey = 'css';
    if (courseId == 3) courseKey = 'js';

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
            <div class="curriculum-module-item ${idx === currentReaderModuleIndex ? 'active' : ''}" style="cursor:pointer; ${idx === currentReaderModuleIndex ? 'border-color:#f97316; background:rgba(249,115,22,0.08);' : ''}" onclick="selectReaderModule(${idx})">
                <div class="curriculum-module-title">
                    <i class="fa-solid fa-file-code me-2" style="color:${idx === currentReaderModuleIndex ? '#f97316' : '#10b981'};"></i>
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
