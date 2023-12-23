import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrsKx3-0t2ftwhZHKfU6aa2I2SgD1-sDo",
    authDomain: "site-e8af0.firebaseapp.com",
    databaseURL:
        "https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-e8af0",
    storageBucket: "site-e8af0.appspot.com",
    messagingSenderId: "276359374008",
    appId: "1:276359374008:web:21818d5f554974eea1004d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function auth_Google() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            localStorage.setItem("GoogleToken", token);
            console.log(user);
            window.location.href = "/";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

window.auth_Google = auth_Google;

const database = getDatabase(app);
const profilesRef = ref(database, "profiles");

const userName = document.getElementById("UserName");
const userEmail = document.getElementById("Email");
const userPassword = document.getElementById("Password");

async function signUp(userName, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(userCredential.user, {
            displayName: userName,
        });
        console.log("User registered:", userCredential.user);
        userCredential.getIdToken().then((firebaseToken) => {
            localStorage.setItem("EmailToken", firebaseToken);
        });

        const profile_data = {
            [userCredential.user.uid]: {
                compl_quiz: 0,
                true_ans: 0,
                wrong_ans: 0,
            },
        };
        update(profilesRef, profile_data)
            .then(() => {
                console.log("New user data saved successfully!");
            })
            .catch((error) => {
                console.error("Error adding new user data: ", error);
            });
        verify_user();
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            document.querySelector("p").innerText =
                "Вже є існуючий аккаунт на цій пошті";
        } else {
            // Інші випадки помилок
            document.querySelector("p").innerText =
                "Під час обрипки запиту виникла помилка";
        }
    }
}

function verify_user() {
    sendEmailVerification(auth.currentUser).then(() => {
        alert("Ви успішно зарейстровані, підтверьде свою електрону пошту");
        window.location.href = "/";
    });
}

document.getElementById("Form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement registration logic here
    signUp(userName.value, userEmail.value, userPassword.value);
});
