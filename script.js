document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. MOBILE NAVIGATION
    // =========================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    const navLinks = document.querySelectorAll(
        ".nav-link, .nav-contact"
    );

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

        document.addEventListener("click", event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    // =========================
    // 2. CHANGING HERO TEXT
    // =========================

    const roleText = document.getElementById("role-text");

    const roles = [
        "digital experiences",
        "useful applications",
        "better coding skills",
        "real-world solutions"
    ];

    let roleIndex = 0;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (roleText && !reduceMotion) {

        window.setInterval(() => {

            roleText.style.opacity = "0";

            window.setTimeout(() => {

                roleIndex = (roleIndex + 1) % roles.length;

                roleText.textContent = roles[roleIndex];

                roleText.style.opacity = "1";

            }, 220);

        }, 2600);

    }


    // =========================
    // 3. SKILLS FILTERING
    // =========================

    const filterButtons = document.querySelectorAll(
        ".filter-button"
    );

    const skillCards = document.querySelectorAll(
        ".skill-card"
    );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(item => {

                const isActive = item === button;

                item.classList.toggle(
                    "active",
                    isActive
                );

                item.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            skillCards.forEach(card => {

                const shouldShow =
                    filter === "all" ||
                    card.dataset.category === filter;

                card.classList.toggle(
                    "hidden",
                    !shouldShow
                );

            });

        });

    });


    // =========================
    // 4. SCROLL REVEAL ANIMATION
    // =========================

    const revealItems = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => {

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add("visible");

        });

    }


    // =========================
    // 5. ACTIVE NAVIGATION LINK
    // =========================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        document
                            .querySelectorAll(".nav-link")
                            .forEach(link => {

                                const isActive =
                                    link.getAttribute("href") ===
                                    `#${currentId}`;

                                link.classList.toggle(
                                    "active",
                                    isActive
                                );

                            });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    // =========================
    // 6. PROFILE IMAGE FALLBACK
    // =========================

    const profileImg = document.getElementById(
        "profile-img"
    );

    const profileFallback = document.getElementById(
        "profile-fallback"
    );

    if (profileImg && profileFallback) {

        const showFallback = () => {

            profileImg.style.display = "none";

            profileFallback.style.display = "grid";

        };

        const showImage = () => {

            profileImg.style.display = "block";

            profileFallback.style.display = "none";

        };

        profileImg.addEventListener(
            "error",
            showFallback
        );

        profileImg.addEventListener(
            "load",
            showImage
        );

        if (profileImg.complete) {

            if (profileImg.naturalWidth > 0) {

                showImage();

            } else {

                showFallback();

            }

        }

    }


    // =========================
    // 7. AUTOMATIC COPYRIGHT YEAR
    // =========================

    const year = document.getElementById(
        "current-year"
    );

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    // =========================
    // 8. BACK TO TOP BUTTON
    // =========================

    const backTop = document.querySelector(
        ".back-top"
    );

    if (backTop) {

        backTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });

        });

    }

});