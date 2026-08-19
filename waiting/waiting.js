import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


/* =================================
   FIREBASE CONFIG
================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyAxG3Qhxj2hYQqQfXTB8MFR9jaL9bu3KiY",

    authDomain:
        "best-6dc7e.firebaseapp.com",

    projectId:
        "best-6dc7e",

    storageBucket:
        "best-6dc7e.firebasestorage.app",

    messagingSenderId:
        "790995369457",

    appId:
        "1:790995369457:web:bafb5e41da8af071d9d850",

    measurementId:
        "G-1BE86M53DW"

};


/* =================================
   INITIALIZE FIREBASE
================================= */

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


/* =================================
   ELEMENTS
================================= */

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");


/* =================================
   AUTH CHECK
================================= */

onAuthStateChanged(
    auth,
    (user) => {

        /*
            Firebase has now checked
            the saved login session.
        */


        if (!user) {

            /*
                No authenticated user.

                Send back to website.
            */

            window.location.replace(
                "../index.html"
            );

            return;

        }


        /*
            USER IS LOGGED IN
        */


        console.log(
            "Authenticated user:",
            user
        );


        /* NAME */

        studentName.textContent =
            user.displayName ||
            "Student";


        /* EMAIL */

        studentEmail.textContent =
            user.email ||
            "";

    }
);
