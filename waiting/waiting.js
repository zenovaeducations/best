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
    document.getElementById(
        "studentName"
    );


const studentEmail =
    document.getElementById(
        "studentEmail"
    );



/* =================================
   CHECK LOGIN
================================= */

onAuthStateChanged(
    auth,
    (user) => {


        /*
            NO USER LOGGED IN

            Someone directly opened:

            /waiting/index.html

            without logging in.

            Send them home.
        */

        if(!user){

            window.location.replace(
                "../index.html"
            );

            return;

        }



        /* =========================
           USER IS LOGGED IN
        ========================= */


        /*
            Google displayName
            example:

            "Manjunath"

            If Google doesn't provide
            a name, use "Student".
        */

        studentName.textContent =
            user.displayName ||
            "Student";


        /*
            Show Google email
        */

        studentEmail.textContent =
            user.email ||
            "";

    }
);
