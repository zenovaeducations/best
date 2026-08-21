document.addEventListener("DOMContentLoaded", function () {

    const applyingFor =
        document.getElementById("applyingFor");

    const streamGroup =
        document.getElementById("streamGroup");

    const courseGroup =
        document.getElementById("courseGroup");

    const stream =
        document.getElementById("stream");

    const course =
        document.getElementById("course");

    const form =
        document.getElementById("admissionForm");


    /* =========================
       SHOW PUC OPTIONS
    ========================= */

    applyingFor.addEventListener("change", function () {

        const value = applyingFor.value;

        if (
            value === "1st PUC" ||
            value === "2nd PUC"
        ) {

            streamGroup.classList.remove("hidden");

        } else {

            streamGroup.classList.add("hidden");
            courseGroup.classList.add("hidden");

            stream.value = "";
            course.innerHTML =
                '<option value="">Select course</option>';

        }

    });


    /* =========================
       STREAM → COURSE
    ========================= */

    stream.addEventListener("change", function () {

        const selectedStream =
            stream.value;

        course.innerHTML =
            '<option value="">Select course</option>';


        if (selectedStream === "Science") {

            const scienceCourses = [
                "PCMB",
                "PCMC"
            ];

            scienceCourses.forEach(function (item) {

                const option =
                    document.createElement("option");

                option.value = item;
                option.textContent = item;

                course.appendChild(option);

            });

            courseGroup.classList.remove("hidden");

        }


        if (selectedStream === "Commerce") {

            const commerceCourses = [
                "CEBA"
            ];

            commerceCourses.forEach(function (item) {

                const option =
                    document.createElement("option");

                option.value = item;
                option.textContent = item;

                course.appendChild(option);

            });

            courseGroup.classList.remove("hidden");

        }


        if (selectedStream === "") {

            courseGroup.classList.add("hidden");

        }

    });


    /* =========================
       PHONE VALIDATION
    ========================= */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            input.value =
                input.value.replace(/\D/g, "");

        });

    });


    /* =========================
       FORM SUBMISSION
    ========================= */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const consent =
            document.getElementById("consent");


        if (!consent.checked) {

            alert(
                "Please confirm the information provided."
            );

            return;

        }


        /*
         * Temporary behaviour.
         *
         * The form is currently frontend-only.
         * Later this can be connected to
         * Firebase Firestore.
         */

        const studentName =
            document.getElementById("studentName").value;


        alert(
            "Thank you, " +
            studentName +
            "! Your 2027–28 registration details have been received."
        );


        /*
         * Later:
         *
         * Firestore save
         * ↓
         * Application ID
         * ↓
         * Thank-you page
         */


    });

});
