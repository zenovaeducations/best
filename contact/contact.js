document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contactForm");

    const phone =
        document.getElementById("phone");


    phone.addEventListener("input", () => {

        phone.value =
            phone.value
                .replace(/\D/g, "")
                .slice(0, 10);

    });


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        if (!/^[0-9]{10}$/.test(phone.value)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            phone.focus();

            return;

        }


        const name =
            document.getElementById("name").value.trim();


        alert(
            `Thank you, ${name}. Your enquiry has been received. Our team will contact you shortly.`
        );


        form.reset();

    });

});
