document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealItems =
        document.querySelectorAll(
            ".academic-card, .future-card, .year-card, .stream-card, .point, .support-list div"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:0.12
            }
        );


    revealItems.forEach(item => {

        item.classList.add("reveal-item");

        observer.observe(item);

    });


    /* =========================================
       CTA BUTTON MICRO INTERACTION
    ========================================= */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {
                button.style.transform =
                    "translateY(-2px)";
            }
        );


        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform =
                    "translateY(0)";
            }
        );

    });

});
