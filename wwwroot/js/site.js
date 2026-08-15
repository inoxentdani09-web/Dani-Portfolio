const elements = document.querySelectorAll(".animate");
const observer = new IntersectionObserver((entires) => {
    entires.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
elements.forEach(element => {
    observer.observe(element);
})


