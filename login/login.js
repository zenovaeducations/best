import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult
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
    document.getElementById(
        "googleLogin"
    );


const message =
    document.getElementById(
        "message"
    );



/* =================================
   MESSAGE
================================= */

function showMessage(
    text,
    type = ""
){

    message.textContent = text;

    message.className =
        "message";

    if(type){

        message.classList.add(
            type
        );

    }

}



/* =================================
   GOOGLE LOGIN
================================= */

googleLogin.addEventListener(
    "click",
    async () => {

        try{

            googleLogin.disabled =
                true;

            googleLogin.innerHTML =
                "OPENING GOOGLE...";


            const provider =
                new GoogleAuthProvider();


            /*
                Always show the
                Google account selector.
            */

            provider.setCustomParameters({

                prompt:
                    "select_account"

            });


            /*
                Redirect is used instead
                of popup because it works
                better on mobile.
            */

            await signInWithRedirect(
                auth,
                provider
            );

        }

        catch(error){

            console.error(error);

            showMessage(
                "Unable to open Google login. Please try again.",
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



/* =================================
   GOOGLE REDIRECT RESULT
================================= */

try{

    const result =
        await getRedirectResult(
            auth
        );


    if(
        result &&
        result.user
    ){

        showMessage(
            "Login successful. Redirecting...",
            "success"
        );


        /*
            TEMPORARY LOCATION.

            We will replace this
            after creating the
            actual BEST dashboard.
        */

        setTimeout(
            () => {

                window.location.href =
                    "../dashboard/index.html";

            },
            1000
        );

    }

}

catch(error){

    console.error(error);


    showMessage(
        "Google login failed. Please try again.",
        "error"
    );


    googleLogin.disabled =
        false;

}
