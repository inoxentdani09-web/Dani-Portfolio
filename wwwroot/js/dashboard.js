document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Projects Overview Chart
    // ==========================
    const ctx = document.getElementById("projectsChart");

    if (ctx) {
        const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(249,115,22,0.22)");
        gradient.addColorStop(1, "rgba(249,115,22,0.02)");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Projects",
                    data: [1, 8, 5, 9, 12, 18],
                    backgroundColor: gradient,
                    borderColor: "#F97316",
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#F97316"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: "rgba(255,255,255,0.05)"
                        },
                        ticks: {
                            color: "#9CA3AF"
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: "rgba(255,255,255,0.05)"
                        },
                        ticks: {
                            color: "#9CA3AF"
                        }
                    }
                }
            }
        });
    }

    // ==========================
    // Sidebar Toggle
    // ==========================
    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    toggle.addEventListener("click", (e) => {
        e.stopPropagation(); // document click ko rok de

        if (window.innerWidth <= 768) {
            sidebar.classList.toggle("active");
        } else {
            sidebar.classList.toggle("collapsed");
            main.classList.toggle("expanded");
        }
    });

    sidebar.addEventListener("click", (e) => {
        e.stopPropagation(); // sidebar ke andar click par band na ho
    });

    document.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
        }
    });
    const projectsLink = document.getElementById("projectsLink");

    projectsLink.addEventListener("click", function (e) {
        e.preventDefault();

        fetch("/Admin/Projects")
            .then(response => response.text())
            .then(html => {
                document.getElementById("main-content").innerHTML = html;
            });
    });
    
    const dashboardLink = document.getElementById("dashboardLink");

    dashboardLink.addEventListener("click", function (e) {
        e.preventDefault();

        location.href = "/Admin/Dashboard";
    });


});
const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn.querySelector("i");

// Refresh ke baad theme yaad rakho
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    icon.className = "fa-solid fa-moon";
} else {
    icon.className = "fa-solid fa-sun";
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {

        localStorage.setItem("theme", "light");
        icon.className = "fa-solid fa-moon";

    } else {

        localStorage.setItem("theme", "dark");
        icon.className = "fa-solid fa-sun";

    }

});
function openProjectModal() {

    document.querySelector("#addProjectModal form").reset();
    document.getElementById("ProjectID").value = 0;
    document.getElementById("ImageFile").value = "";
    const preview = document.getElementById("imagePreview");
    if (preview) {
        preview.src = "";
        preview.style.display = "none";
    }

    // Modal open
    const modal = document.getElementById("addProjectModal");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}
// function openProjectModal() {
//     const modal = document.getElementById("addProjectModal");

//     console.log(modal);

//     modal.style.display = "flex";
// }
function closeProjectModal() {
   
    const modal = document.getElementById("addProjectModal");

    if (modal) {
        
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
}
function editProject(id) {
    fetch(`/Admin/GetProject?id=${id}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("ProjectID").value = data.projectID;

            document.getElementById("Title").value = data.title;

            document.getElementById("Description").value = data.description;

            document.getElementById("Category").value = data.category;

            document.getElementById("Technalogy").value = data.technalogy;

            document.getElementById("Status").value = data.status;

            document.getElementById("GitHub").value = data.gitHub;

            document.getElementById("LiveDemo").value = data.liveDemo;

            //Image Preview
            document.getElementById("ProjectImagePreview").src = "/Images/" + data.image;
            document.getElementById("ProjectImagePreview").style.display = "block";

            // Modal open
            document.getElementById("addProjectModal").style.display = "flex";

        })
        .catch(error => {
            console.log(error);
        });
}
// const SkillLink = document.getElementById("skillsLink");

// SkillLink.addEventListener("click", function (e) {
//     e.preventDefault();

//     location.href = "/Admin/Dashboard/Skills";
// });
const skillsLink = document.getElementById("skillLink");

skillsLink.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/Admin/Skills")
        .then(response => response.text())
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

        });
});
const courseLink = document.getElementById("courseLink");

courseLink.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/Admin/Course")
        .then(response => response.text())
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

        });
});
const messagesLink = document.getElementById("messagesLink");

messagesLink.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/Admin/Message")
        .then(response => response.text())
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

        });
});

document.addEventListener("click", function (e) {

    // Add Skill button
    if (e.target.closest("#openAddSkill")) {

        const modal = document.getElementById("skillModalOverlay");

        if (!modal) return;

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }


    // Close button
    if (e.target.closest("#skillModalClose")) {

        closeSkillModal();
    }


    // Cancel button
    if (e.target.closest("#skillModalCancel")) {

        closeSkillModal();
    }

});


function closeSkillModal() {

    const modal = document.getElementById("skillModalOverlay");

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


// Click outside modal
document.addEventListener("click", function (e) {

    const modal = document.getElementById("skillModalOverlay");

    if (!modal) return;

    if (e.target === modal) {
        closeSkillModal();
    }

});

const skillImageInput = document.getElementById("SkillImage");
const skillImagePreview = document.getElementById("skillImagePreview");

if (skillImageInput) {

    skillImageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            skillImagePreview.innerHTML = `
                <i class="fa-regular fa-image"></i>
                <span>Preview</span>
            `;
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

            skillImagePreview.innerHTML = `
                <img src="${e.target.result}" alt="Skill Preview">
            `;

        };

        reader.readAsDataURL(file);

    });

}