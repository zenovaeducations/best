import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import firebaseConfig from "./firebase-config.js";



/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



/* ELEMENTS */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const rememberMe =
    document.getElementById("rememberMe");

const loginBtn =
    document.getElementById("loginBtn");

const googleLogin =
    document.getElementById("googleLogin");

const forgotPassword =
    document.getElementById("forgotPassword");

const togglePassword =
    document.getElementById("togglePassword");

const message =
    document.getElementById("message");



/* MESSAGE */

function showMessage(text, type = "") {

    message.textContent = text;

    message.className = "message";

    if(type){

        message.classList.add(type);

    }

}



/* LOADING */

function setLoading(isLoading){

    loginBtn.disabled = isLoading;

    googleLogin.disabled = isLoading;

    loginBtn.textContent =
        isLoading
            ? "LOGGING IN..."
            : "LOGIN";

}



/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword
                ? "text"
                : "password";

        togglePassword.textContent =
            isPassword
                ? "HIDE"
                : "SHOW";

    }
);



/* EMAIL + PASSWORD LOGIN */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if(!email || !password){

            showMessage(
                "Please enter your email and password.",
                "error"
            );

            return;
        }


        setLoading(true);

        showMessage("");


        try{

            const persistence =
                rememberMe.checked
                    ? browserLocalPersistence
                    : browserSessionPersistence;


            await setPersistence(
                auth,
                persistence
            );


            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            /*
                TEMPORARY DASHBOARD PATH

                We will change this when
                we build the actual dashboard.
            */

            setTimeout(
                () => {

                    window.location.href =
                        "../dashboard/index.html";

                },
                800
            );


        }

        catch(error){

            console.error(error);


            let errorMessage =
                "Unable to login. Please check your details.";


            if(

                error.code ===
                "auth/invalid-credential"

                ||

                error.code ===
                "auth/wrong-password"

                ||

                error.code ===
                "auth/user-not-found"

            ){

                errorMessage =
                    "Invalid email or password.";

            }


            else if(

                error.code ===
                "auth/too-many-requests"

            ){

                errorMessage =
                    "Too many attempts. Please try again later.";

            }


            else if(

                error.code ===
                "auth/invalid-email"

            ){

                errorMessage =
                    "Please enter a valid email address.";

            }


            showMessage(
                errorMessage,
                "error"
            );


            setLoading(false);

        }

    }
);



/* GOOGLE LOGIN */

googleLogin.addEventListener(
    "click",
    async () => {

        setLoading(true);

        showMessage("");


        try{

            const provider =
                new GoogleAuthProvider();


            await setPersistence(

                auth,

                rememberMe.checked
                    ? browserLocalPersistence
                    : browserSessionPersistence

            );


            await signInWithPopup(
                auth,
                provider
            );


            showMessage(
                "Google login successful. Redirecting...",
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "../dashboard/index.html";

                },
                800
            );


        }

        catch(error){

            console.error(error);


            if(
                error.code ===
                "auth/popup-closed-by-user"
            ){

                showMessage(
                    "Google login was cancelled.",
                    "error"
                );

            }


            else if(
                error.code ===
                "auth/popup-blocked"
            ){

                showMessage(
                    "Please allow popups for Google login.",
                    "error"
                );

            }


            else{

                showMessage(
                    "Google login failed. Please try again.",
                    "error"
                );

            }


            setLoading(false);

        }

    }
);



/* FORGOT PASSWORD */

forgotPassword.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();


        if(!email){

            showMessage(
                "Enter your email first, then click Forgot password.",
                "error"
            );

            emailInput.focus();

            return;
        }


        try{

            await sendPasswordResetEmail(
                auth,
                email
            );


            showMessage(
                "Password reset email sent. Check your inbox.",
                "success"
            );

        }


        catch(error){

            console.error(error);


            if(
                error.code ===
                "auth/user-not-found"
            ){

                showMessage(
                    "No account was found with this email.",
                    "error"
                );

            }


            else if(
                error.code ===
                "auth/invalid-email"
            ){

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

            }


            else{

                showMessage(
                    "Unable to send reset email. Please try again.",
                    "error"
                );

            }

        }

    }
);
