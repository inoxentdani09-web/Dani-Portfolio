const cards = document.querySelectorAll(".skill-card .animate");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const index = [...cards].indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.4
});

cards.forEach(card => observer.observe(card));