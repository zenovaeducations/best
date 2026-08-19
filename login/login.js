import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
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

const googleLogin =
    document.getElementById("googleLogin");

const message =
    document.getElementById("message");


/* =================================
   CHECK EXISTING LOGIN
================================= */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            /*
                User is already logged in.

                Don't show login again.
                Send directly to waiting page.
            */

            window.location.replace(
                "../waiting/index.html"
            );

        }

    }
);


/* =================================
   MESSAGE
================================= */

function showMessage(
    text,
    type = ""
) {

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


            const provider =
                new GoogleAuthProvider();


            /*
                Always show account
                selection when Google
                login is actually required.
            */

            provider.setCustomParameters({

                prompt: "select_account"

            });


            const result =
                await signInWithPopup(
                    auth,
                    provider
                );


            console.log(
                "Google login successful:",
                result.user
            );


            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            /*
                Go to waiting page.
            */

            setTimeout(
                () => {

                    window.location.replace(
                        "../waiting/index.html"
                    );

                },
                500
            );

        }


        catch (error) {

            console.error(
                "FIREBASE GOOGLE LOGIN ERROR:",
                error
            );


            showMessage(
                error.code +
                " — " +
                error.message,
                "error"
            );


            googleLogin.disabled =
                false;


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
