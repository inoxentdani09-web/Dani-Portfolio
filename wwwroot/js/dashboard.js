// =========================================================
// DANIYAL CMS - ADMIN DASHBOARD JS
// Dark/Light Mode, Universal Modal Centering, AJAX Handlers
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Theme Initializer
    initThemeState();

    // Mobile sidebar toggle
    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("adminSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    if (toggle && sidebar) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("mobile-open");
            if (backdrop) backdrop.classList.toggle("active");
        });
    }

    // Modal Escape key support
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProjectModal();
            closeSkillModal();
            closeCourseModal();
            const viewModal = document.getElementById("viewMessageModal");
            if (viewModal) viewModal.classList.remove("show");
            const replyModal = document.getElementById("replyMessageModal");
            if (replyModal) replyModal.classList.remove("show");
            const proofModal = document.getElementById("proofViewModalOverlay");
            if (proofModal) proofModal.classList.remove("show");
        }
    });

    // Close modal on backdrop click
    document.querySelectorAll(".add-project-modal, .skill-modal-overlay, .custom-admin-modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", function (e) {
            if (e.target === this) {
                this.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    });
});

// ==========================================
// DARK / LIGHT THEME TOGGLE
// ==========================================
function initThemeState() {
    const savedTheme = localStorage.getItem('daniyal_admin_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

function toggleAdminTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('daniyal_admin_theme', nextTheme);
    updateThemeUI(nextTheme);

    // Re-render dashboard skills chart if exists
    if (typeof initDashboardSkillsChart === 'function') {
        initDashboardSkillsChart();
    }
}

function updateThemeUI(theme) {
    const icon = document.getElementById('themeToggleIcon');
    const text = document.getElementById('themeToggleText');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'fa-solid fa-sun';
            icon.style.color = '#ea580c';
            if (text) text.innerText = 'Light';
        } else {
            icon.className = 'fa-solid fa-moon';
            icon.style.color = '#38bdf8';
            if (text) text.innerText = 'Dark';
        }
    }
}

// ==========================================
// MOBILE SIDEBAR TOGGLE
// ==========================================
function toggleMobileSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.toggle('mobile-open');
    if (backdrop) backdrop.classList.toggle('active');
}

// ==========================================
// PROJECT MODAL FUNCTIONS
// ==========================================
function openProjectModal() {
    const form = document.querySelector("#addProjectModal form");
    if (form) form.reset();
    
    const idEl = document.getElementById("ProjectID");
    if (idEl) idEl.value = 0;

    const titleEl = document.getElementById("projectModalHeading");
    if (titleEl) titleEl.innerText = "Add New Project";

    const preview = document.getElementById("ProjectImagePreview");
    if (preview) {
        preview.src = "";
        preview.style.display = "none";
    }

    const modal = document.getElementById("addProjectModal");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeProjectModal() {
    const modal = document.getElementById("addProjectModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

async function editProject(id) {
    try {
        const response = await fetch(`/Admin/GetProject?id=${id}`);
        const data = await response.json();

        document.getElementById("ProjectID").value = data.projectID;
        document.getElementById("Title").value = data.title || '';
        document.getElementById("Description").value = data.description || '';
        document.getElementById("Category").value = data.category || 'Portfolio';
        document.getElementById("Technalogy").value = data.technalogy || '';
        document.getElementById("Status").value = data.status || 'Published';
        document.getElementById("GitHub").value = data.gitHub || '';
        document.getElementById("LiveDemo").value = data.liveDemo || '';

        const titleEl = document.getElementById("projectModalHeading");
        if (titleEl) titleEl.innerText = "Edit Project: " + data.title;

        const preview = document.getElementById("ProjectImagePreview");
        if (preview && data.image) {
            preview.src = "/Images/" + data.image;
            preview.style.display = "block";
        }

        const modal = document.getElementById("addProjectModal");
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    } catch (error) {
        alert("Failed to load project: " + error.message);
    }
}

async function deleteProject(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
        const res = await fetch("/Admin/DeleteProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
        const result = await res.json();
        if (result.success) {
            window.location.reload();
        } else {
            alert("Delete failed: " + (result.message || "Error"));
        }
    } catch (err) {
        alert("Failed to delete project: " + err.message);
    }
}

// ==========================================
// SKILL MODAL FUNCTIONS
// ==========================================
function openSkillModal() {
    const form = document.querySelector("#skillModalOverlay form");
    if (form) form.reset();

    const idEl = document.getElementById("SkillId");
    if (idEl) idEl.value = 0;

    const titleEl = document.getElementById("skillModalTitle");
    if (titleEl) titleEl.innerText = "Add Technical Skill";

    const modal = document.getElementById("skillModalOverlay");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeSkillModal() {
    const modal = document.getElementById("skillModalOverlay");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

async function editSkill(id) {
    try {
        const response = await fetch(`/Admin/GetSkill?id=${id}`);
        const data = await response.json();

        document.getElementById("SkillId").value = data.id;
        document.getElementById("SkillName").value = data.name || '';
        document.getElementById("SkillIcon").value = data.icon || '';
        document.getElementById("SkillCategory").value = data.category || 'Frontend';
        document.getElementById("SkillLevel").value = data.level || 'Advanced';
        document.getElementById("SkillStatus").value = data.status || 'Published';
        document.getElementById("SkillDescription").value = data.description || '';

        const titleEl = document.getElementById("skillModalTitle");
        if (titleEl) titleEl.innerText = "Edit Skill: " + data.name;

        const modal = document.getElementById("skillModalOverlay");
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    } catch (error) {
        alert("Failed to load skill: " + error.message);
    }
}

async function deleteSkill(id) {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
        const res = await fetch("/Admin/DeleteSkill", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
        const result = await res.json();
        if (result.success) {
            window.location.reload();
        } else {
            alert("Delete failed: " + (result.message || "Error"));
        }
    } catch (err) {
        alert("Failed to delete skill: " + err.message);
    }
}

// ==========================================
// COURSE MODAL FUNCTIONS
// ==========================================
function openCourseModal() {
    const form = document.querySelector("#courseModalOverlay form");
    if (form) form.reset();

    const idEl = document.getElementById("CourseID");
    if (idEl) idEl.value = 0;

    const titleEl = document.getElementById("courseModalTitle");
    if (titleEl) titleEl.innerText = "Add Course";

    if (typeof toggleCoursePriceFields === 'function') toggleCoursePriceFields();

    const modal = document.getElementById("courseModalOverlay");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeCourseModal() {
    const modal = document.getElementById("courseModalOverlay");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

async function editCourse(id) {
    try {
        const response = await fetch(`/Admin/GetCourse?id=${id}`);
        const data = await response.json();

        document.getElementById("CourseID").value = data.courseID;
        document.getElementById("CourseName").value = data.courseName || '';
        
        const isFree = data.price === 'Free' || data.priceType === 'free';
        const priceTypeSelect = document.getElementById("CoursePriceType");
        if (priceTypeSelect) {
            priceTypeSelect.value = isFree ? 'free' : 'paid';
        }

        const priceInput = document.getElementById("CoursePrice");
        if (priceInput) {
            priceInput.value = data.price || 'PKR 3,500';
        }

        const origPriceInput = document.getElementById("CourseOriginalPrice");
        if (origPriceInput) {
            origPriceInput.value = data.originalPrice || 'PKR 6,000';
        }

        if (typeof toggleCoursePriceFields === 'function') toggleCoursePriceFields();

        document.getElementById("CoursePlatform").value = data.platform || 'Daniyal Academy';
        document.getElementById("CourseInstructor").value = data.instructor || 'Daniyal Khan';
        document.getElementById("CourseCategory").value = data.category || 'Backend';
        document.getElementById("CourseTechnology").value = data.technology || '';
        document.getElementById("CourseLevel").value = data.level || 'Beginner';
        document.getElementById("CourseDuration").value = data.duration || '20 Hours';
        document.getElementById("CourseStatus").value = data.status || 'Completed';
        document.getElementById("CourseUrl").value = data.courseUrl || '';
        document.getElementById("CourseDescription").value = data.description || '';

        const titleEl = document.getElementById("courseModalTitle");
        if (titleEl) titleEl.innerText = "Edit Course: " + data.courseName;

        const modal = document.getElementById("courseModalOverlay");
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    } catch (error) {
        alert("Failed to load course details: " + error.message);
    }
}

async function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
        const res = await fetch("/Admin/DeleteCourse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
        const result = await res.json();
        if (result.success) {
            window.location.reload();
        } else {
            alert("Delete failed: " + (result.message || "Error"));
        }
    } catch (err) {
        alert("Failed to delete course: " + err.message);
    }
}

// ==========================================
// SECURE LOGOUT HANDLER
// ==========================================
function adminLogout(e) {
    if (e && e.preventDefault) e.preventDefault();
    document.cookie = "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";
    document.cookie = "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem('daniyal_admin_session');
    sessionStorage.clear();
    window.location.href = '/Admin/Logout?logged_out=true';
}
