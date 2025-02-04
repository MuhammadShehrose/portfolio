document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function activateNavLink() {
        let scrollY = window.scrollY;

        sections.forEach((section) => {
            let sectionTop = section.offsetTop - 80; // Adjusted for fixed navbar
            let sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateNavLink);

    // Smooth scroll and set active class on click
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjusted for navbar height
                    behavior: "smooth",
                });

                navLinks.forEach((link) => link.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });
});