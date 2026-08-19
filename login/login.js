import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
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
   FIREBASE
================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


/* =================================
   ELEMENTS
================================= */

const googleLogin =
    document.getElementById("googleLogin");

const message =
    document.getElementById("message");


/* =================================
   CHECK EXISTING LOGIN
================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.replace(
            "../waiting/"
        );

    }

});


/* =================================
   MESSAGE
================================= */

function showMessage(text, type = "") {

    message.textContent = text;

    message.className = "message";

    if (type) {
        message.classList.add(type);
    }

}


/* =================================
   GOOGLE LOGIN
================================= */

googleLogin.addEventListener(
    "click",
    async () => {

        try {

            googleLogin.disabled = true;

            googleLogin.innerHTML =
                "OPENING GOOGLE...";


            /*
                IMPORTANT:
                Save Firebase login locally.
            */

            await setPersistence(
                auth,
                browserLocalPersistence
            );


            const provider =
                new GoogleAuthProvider();


            provider.setCustomParameters({
                prompt: "select_account"
            });


            const result =
                await signInWithPopup(
                    auth,
                    provider
                );


            console.log(
                "Logged in:",
                result.user
            );


            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            window.location.replace(
                "../waiting/"
            );


        }

        catch (error) {

            console.error(
                "GOOGLE LOGIN ERROR:",
                error
            );


            showMessage(
                error.code +
                " — " +
                error.message,
                "error"
            );


            googleLogin.disabled = false;


            googleLogin.innerHTML = `

                <span class="google-icon">
                    G
                </span>

                <span>
                    Continue with Google
                </span>

            `;

        }

    }
);
