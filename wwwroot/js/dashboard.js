// =========================================================
// DANIYAL CMS - ADMIN DASHBOARD JS
// Dark/Light Mode, Universal Modal Centering, AJAX Handlers
// =========================================================


document.addEventListener("DOMContentLoaded", function () {

    // Theme Initializer
    initThemeState();


    // =====================================================
    // MOBILE SIDEBAR TOGGLE
    // =====================================================

    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("adminSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    if (toggle && sidebar) {

        toggle.addEventListener("click", (e) => {

            e.stopPropagation();

            sidebar.classList.toggle("mobile-open");

            if (backdrop) {
                backdrop.classList.toggle("active");
            }

        });

    }


    // =====================================================
    // MODAL ESCAPE KEY
    // =====================================================

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeProjectModal();
            closeSkillModal();
            closeCourseModal();


            const viewModal =
                document.getElementById("viewMessageModal");

            if (viewModal) {
                viewModal.classList.remove("show");
            }


            const replyModal =
                document.getElementById("replyMessageModal");

            if (replyModal) {
                replyModal.classList.remove("show");
            }


            const proofModal =
                document.getElementById("proofViewModalOverlay");

            if (proofModal) {
                proofModal.classList.remove("show");
            }

        }

    });


    // =====================================================
    // CLOSE MODAL ON BACKDROP CLICK
    // =====================================================

    document
        .querySelectorAll(
            ".add-project-modal, .skill-modal-overlay, .custom-admin-modal-overlay, #courseModalOverlay"
        )
        .forEach(overlay => {

            overlay.addEventListener("click", function (e) {

                if (e.target === this) {

                    this.classList.remove("show");

                    document.body.style.overflow = "";

                }

            });

        });

});


// =========================================================
// DARK / LIGHT THEME TOGGLE
// =========================================================

function initThemeState() {

    const savedTheme =
        localStorage.getItem("daniyal_admin_theme") || "dark";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    updateThemeUI(savedTheme);
}


function toggleAdminTheme() {

    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";

    const nextTheme =
        currentTheme === "dark" ? "light" : "dark";


    document.documentElement.setAttribute(
        "data-theme",
        nextTheme
    );

    localStorage.setItem(
        "daniyal_admin_theme",
        nextTheme
    );

    updateThemeUI(nextTheme);


    if (
        typeof initDashboardSkillsChart === "function"
    ) {

        initDashboardSkillsChart();

    }

}


function updateThemeUI(theme) {

    const icon =
        document.getElementById("themeToggleIcon");

    const text =
        document.getElementById("themeToggleText");


    if (icon) {

        if (theme === "light") {

            icon.className = "fa-solid fa-sun";
            icon.style.color = "#ea580c";

            if (text) {
                text.innerText = "Light";
            }

        }
        else {

            icon.className = "fa-solid fa-moon";
            icon.style.color = "#38bdf8";

            if (text) {
                text.innerText = "Dark";
            }

        }

    }

}


// =========================================================
// MOBILE SIDEBAR TOGGLE
// =========================================================

function toggleMobileSidebar() {

    const sidebar =
        document.getElementById("adminSidebar");

    const backdrop =
        document.getElementById("sidebarBackdrop");


    if (sidebar) {
        sidebar.classList.toggle("mobile-open");
    }


    if (backdrop) {
        backdrop.classList.toggle("active");
    }

}


// =========================================================
// PROJECT MODAL FUNCTIONS
// =========================================================

function openProjectModal() {

    const form =
        document.querySelector("#addProjectModal form");

    if (form) {
        form.reset();
    }


    const idEl =
        document.getElementById("ProjectID");

    if (idEl) {
        idEl.value = 0;
    }


    const titleEl =
        document.getElementById("projectModalHeading");

    if (titleEl) {
        titleEl.innerText = "Add New Project";
    }


    const preview =
        document.getElementById("ProjectImagePreview");

    if (preview) {

        preview.src = "";

        preview.style.display = "none";

    }


    const modal =
        document.getElementById("addProjectModal");

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeProjectModal() {

    const modal =
        document.getElementById("addProjectModal");

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }

}


async function editProject(id) {

    try {

        const response =
            await fetch(`/Admin/GetProject?id=${id}`);

        const data =
            await response.json();


        document.getElementById("ProjectID").value =
            data.projectID;

        document.getElementById("Title").value =
            data.title || "";

        document.getElementById("Description").value =
            data.description || "";

        document.getElementById("Category").value =
            data.category || "Portfolio";

        document.getElementById("Technalogy").value =
            data.technalogy || "";

        document.getElementById("Status").value =
            data.status || "Published";

        document.getElementById("GitHub").value =
            data.gitHub || "";

        document.getElementById("LiveDemo").value =
            data.liveDemo || "";


        const titleEl =
            document.getElementById("projectModalHeading");

        if (titleEl) {

            titleEl.innerText =
                "Edit Project: " + data.title;

        }


        const preview =
            document.getElementById("ProjectImagePreview");

        if (preview && data.image) {

            preview.src =
                "/Images/" + data.image;

            preview.style.display =
                "block";

        }


        const modal =
            document.getElementById("addProjectModal");

        if (modal) {

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        }

    }
    catch (error) {

        alert(
            "Failed to load project: " +
            error.message
        );

    }

}


async function deleteProject(id) {

    if (
        !confirm(
            "Are you sure you want to delete this project?"
        )
    ) {
        return;
    }


    try {

        const res =
            await fetch("/Admin/DeleteProject", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id: id
                })

            });


        const result =
            await res.json();


        if (result.success) {

            window.location.reload();

        }
        else {

            alert(
                "Delete failed: " +
                (result.message || "Error")
            );

        }

    }
    catch (err) {

        alert(
            "Failed to delete project: " +
            err.message
        );

    }

}


// =========================================================
// SKILL MODAL FUNCTIONS
// =========================================================

function openSkillModal() {

    const form =
        document.querySelector("#skillModalOverlay form");

    if (form) {
        form.reset();
    }


    const idEl =
        document.getElementById("SkillId");

    if (idEl) {
        idEl.value = 0;
    }


    const titleEl =
        document.getElementById("skillModalTitle");

    if (titleEl) {
        titleEl.innerText = "Add Technical Skill";
    }


    const modal =
        document.getElementById("skillModalOverlay");

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


function closeSkillModal() {

    const modal =
        document.getElementById("skillModalOverlay");

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }

}


async function editSkill(id) {

    try {

        const response =
            await fetch(`/Admin/GetSkill?id=${id}`);

        const data =
            await response.json();


        document.getElementById("SkillId").value =
            data.id;

        document.getElementById("SkillName").value =
            data.name || "";

        document.getElementById("SkillIcon").value =
            data.icon || "";

        document.getElementById("SkillCategory").value =
            data.category || "Frontend";

        document.getElementById("SkillLevel").value =
            data.level || "Advanced";

        document.getElementById("SkillStatus").value =
            data.status || "Published";

        document.getElementById("SkillDescription").value =
            data.description || "";


        const titleEl =
            document.getElementById("skillModalTitle");

        if (titleEl) {

            titleEl.innerText =
                "Edit Skill: " + data.name;

        }


        const modal =
            document.getElementById("skillModalOverlay");

        if (modal) {

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        }

    }
    catch (error) {

        alert(
            "Failed to load skill: " +
            error.message
        );

    }

}


async function deleteSkill(id) {

    if (
        !confirm(
            "Are you sure you want to delete this skill?"
        )
    ) {
        return;
    }


    try {

        const res =
            await fetch("/Admin/DeleteSkill", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id: id
                })

            });


        const result =
            await res.json();


        if (result.success) {

            window.location.reload();

        }
        else {

            alert(
                "Delete failed: " +
                (result.message || "Error")
            );

        }

    }
    catch (err) {

        alert(
            "Failed to delete skill: " +
            err.message
        );

    }

}


// =========================================================
// COURSE MODAL FUNCTIONS
// =========================================================

// ---------------------------------------------------------
// OPEN ADD COURSE
// ---------------------------------------------------------

function openCourseModal() {

    const form =
        document.getElementById("courseForm");

    if (form) {
        form.reset();
    }


    const idEl =
        document.getElementById("CourseID");

    if (idEl) {
        idEl.value = "0";
    }


    const titleEl =
        document.getElementById("courseModalTitle");

    if (titleEl) {
        titleEl.innerText = "Add Course";
    }


    // Default Platform
    const platform =
        document.getElementById("CoursePlatform");

    if (platform) {
        platform.value = "Online";
    }


    // Default Price Type
    const priceType =
        document.getElementById("CoursePriceType");

    if (priceType) {
        priceType.value = "paid";
    }


    // Default Status
    const status =
        document.getElementById("CourseStatus");

    if (status) {
        status.value = "Published";
    }


    // Default Rating
    const rating =
        document.getElementById("CourseRating");

    if (rating) {
        rating.value = "4.9";
    }


    // Default Students
    const students =
        document.getElementById("CourseStudents");

    if (students) {
        students.value = "120";
    }


    // Price fields
    if (
        typeof toggleCoursePriceFields ===
        "function"
    ) {

        toggleCoursePriceFields();

    }


    const modal =
        document.getElementById("courseModalOverlay");

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


// ---------------------------------------------------------
// CLOSE COURSE
// ---------------------------------------------------------

function closeCourseModal() {

    const modal =
        document.getElementById("courseModalOverlay");

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }

}


// ---------------------------------------------------------
// EDIT COURSE
// ---------------------------------------------------------

async function editCourse(id) {

    console.log(
        "EDIT COURSE:",
        id
    );


    if (!id) {

        alert(
            "Course ID is missing."
        );

        return;

    }


    try {

        const response =
            await fetch(
                `/Admin/GetCourseDetails?id=${encodeURIComponent(id)}`,
                {
                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    },

                    credentials: "same-origin"
                }
            );


        console.log(
            "Course response status:",
            response.status
        );


        // Response ko pehle text mein read karenge
        const raw =
            await response.text();


        console.log(
            "Course raw response:",
            raw
        );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}: ${raw || "Empty response"}`
            );

        }


        if (!raw.trim()) {

            throw new Error(
                "Server ne empty response return kiya."
            );

        }


        const data =
            JSON.parse(raw);


        console.log(
            "Parsed course:",
            data
        );


        if (
            !data.success ||
            !data.course
        ) {

            throw new Error(
                data.message ||
                "Course not found."
            );

        }


        const c =
            data.course;


        // =================================================
        // BASIC INFORMATION
        // =================================================

        const courseID =
            document.getElementById("CourseID");

        if (courseID) {

            courseID.value =
                c.courseID ?? id;

        }


        const title =
            document.getElementById("CourseName");

        if (title) {

            title.value =
                c.title ?? "";

        }


        const subtitle =
            document.getElementById("CourseSubtitle");

        if (subtitle) {

            subtitle.value =
                c.subtitle ?? "";

        }


        const category =
            document.getElementById("CourseCategory");

        if (category) {

            category.value =
                c.category ?? "Backend";

        }


        // =================================================
        // PLATFORM
        // =================================================

        const platform =
            document.getElementById("CoursePlatform");

        if (platform) {

            platform.value =
                c.platform ?? "Online";

        }


        // =================================================
        // LANGUAGE
        // =================================================

        const language =
            document.getElementById("CourseLanguage");

        if (language) {

            language.value =
                c.language ?? "Urdu / Hindi";

        }


        // =================================================
        // LEVEL
        // =================================================

        const level =
            document.getElementById("CourseLevel");

        if (level) {

            level.value =
                c.level ?? "All Levels";

        }


        // =================================================
        // PRICE
        // =================================================

        const priceType =
            document.getElementById("CoursePriceType");

        if (priceType) {

            priceType.value =
                c.priceType ?? "paid";

        }


        const price =
            document.getElementById("CoursePrice");

        if (price) {

            price.value =
                c.price ?? "";

        }


        const originalPrice =
            document.getElementById(
                "CourseOriginalPrice"
            );

        if (originalPrice) {

            originalPrice.value =
                c.originalPrice ?? "";

        }


        // =================================================
        // COURSE DETAILS
        // =================================================

        const duration =
            document.getElementById("CourseDuration");

        if (duration) {

            duration.value =
                c.duration ?? "";

        }


        const lectures =
            document.getElementById("CourseLectures");

        if (lectures) {

            lectures.value =
                c.lecturesCount ?? "";

        }


        const rating =
            document.getElementById("CourseRating");

        if (rating) {

            rating.value =
                c.rating ?? 4.9;

        }


        const students =
            document.getElementById("CourseStudents");

        if (students) {

            students.value =
                c.enrolledStudents ?? 0;

        }


        const status =
            document.getElementById("CourseStatus");

        if (status) {

            status.value =
                c.status ?? "Published";

        }


        // =================================================
        // LINKS
        // =================================================

        const courseURL =
            document.getElementById("CourseUrl");

        if (courseURL) {

            courseURL.value =
                c.courseUrl ?? "";

        }


        const videoURL =
            document.getElementById(
                "CourseVideoUrl"
            );

        if (videoURL) {

            videoURL.value =
                c.videoUrl ?? "";

        }


        // =================================================
        // DESCRIPTION
        // =================================================

        const description =
            document.getElementById(
                "CourseDescription"
            );

        if (description) {

            description.value =
                c.description ?? "";

        }


        // =================================================
        // SYLLABUS
        // =================================================

        const syllabus =
            document.getElementById(
                "CourseSyllabus"
            );

        if (syllabus) {

            syllabus.value =
                c.syllabus ?? "";

        }


        // Update price fields
        if (
            typeof toggleCoursePriceFields ===
            "function"
        ) {

            toggleCoursePriceFields();

        }


        // Modal title
        const modalTitle =
            document.getElementById(
                "courseModalTitle"
            );

        if (modalTitle) {

            modalTitle.innerText =
                "Edit Course: " +
                (c.title || "Course");

        }


        // Open modal
        const modal =
            document.getElementById(
                "courseModalOverlay"
            );

        if (modal) {

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        }

    }
    catch (error) {

        console.error(
            "Course Edit Error:",
            error
        );


        alert(
            "Failed to load course details:\n\n" +
            error.message
        );

    }

}


// ---------------------------------------------------------
// DELETE COURSE
// ---------------------------------------------------------

async function deleteCourse(id) {

    if (!id) {

        alert(
            "Course ID is missing."
        );

        return;

    }


    if (
        !confirm(
            "Are you sure you want to delete this course?"
        )
    ) {

        return;

    }


    try {

        // IMPORTANT:
        // Controller DeleteCourse(int id)
        // is expecting query string
        const res =
            await fetch(
                `/Admin/DeleteCourse?id=${encodeURIComponent(id)}`,
                {
                    method: "POST",

                    credentials: "same-origin",

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        const raw =
            await res.text();


        console.log(
            "Delete course response:",
            raw
        );


        if (!res.ok) {

            throw new Error(
                `HTTP ${res.status}: ${raw}`
            );

        }


        const result =
            JSON.parse(raw);


        if (result.success) {

            window.location.reload();

        }
        else {

            alert(
                "Delete failed: " +
                (
                    result.message ||
                    "Error"
                )
            );

        }

    }
    catch (err) {

        console.error(
            "Delete Course Error:",
            err
        );


        alert(
            "Failed to delete course:\n\n" +
            err.message
        );

    }

}


// ---------------------------------------------------------
// COURSE PRICE TYPE
// ---------------------------------------------------------

function toggleCoursePriceFields() {

    const priceType =
        document.getElementById(
            "CoursePriceType"
        );


    const priceFields =
        document.querySelectorAll(
            ".course-price-field"
        );


    if (!priceType) {
        return;
    }


    const isFree =
        priceType.value.toLowerCase() ===
        "free";


    priceFields.forEach(
        function (field) {

            field.style.display =
                isFree ? "none" : "";

        }
    );


    if (isFree) {

        const price =
            document.getElementById(
                "CoursePrice"
            );

        const originalPrice =
            document.getElementById(
                "CourseOriginalPrice"
            );


        if (price) {
            price.value = "Free";
        }


        if (originalPrice) {
            originalPrice.value = "";
        }

    }

}


// =========================================================
// SECURE LOGOUT HANDLER
// =========================================================

function adminLogout(e) {

    if (
        e &&
        e.preventDefault
    ) {

        e.preventDefault();

    }


    document.cookie =
        "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";


    document.cookie =
        "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";


    localStorage.removeItem(
        "daniyal_admin_session"
    );


    sessionStorage.clear();


    window.location.href =
        "/Admin/Logout?logged_out=true";

}