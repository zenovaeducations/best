/* =========================================
   CAMPUS PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".event-card, .space-card, .activity-box, .admin-card"
    );


    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform = "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

        revealObserver.observe(element);

    });



    /* =====================================
       ADD SHOW CLASS STYLE
    ===================================== */

    const style = document.createElement("style");

    style.innerHTML = `

        .event-card.show,
        .space-card.show,
        .activity-box.show,
        .admin-card.show{
            opacity:1 !important;
            transform:translateY(0) !important;
        }

    `;

    document.head.appendChild(style);



    /* =====================================
       IMAGE ERROR HANDLING
    ===================================== */

    const images = document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

            image.alt = "BEST Campus Image";

        });

    });



    /* =====================================
       CAMPUS BUTTON
    ===================================== */

    const campusButton =
        document.querySelector(".campus-btn");


    if (campusButton) {

        campusButton.addEventListener("click", function () {

            const target =
                document.querySelector("#campus-life");

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }



    /* =====================================
       PREVENT EMPTY EVENT LINKS
    ===================================== */

    const emptyLinks =
        document.querySelectorAll('a[href="#"]');


    emptyLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });

});
