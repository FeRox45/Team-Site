import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDk0CfC2THqgm7nFhdtNXL_YXepSlpBkeY",
    authDomain: "site-e8af0.firebaseapp.com",
    databaseURL:
        "https://site-e8af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-e8af0",
    storageBucket: "site-e8af0.appspot.com",
    messagingSenderId: "276359374008",
    appId: "1:276359374008:web:dae59ca9dc907297a1004d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const userEmail = document.getElementById("Email");
const userPassword = document.getElementById("Password");

async function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = {
                email: email,
                password: password,
            };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Ви успішно увійшли в систему");
            window.location.href = "/";
        })
        .catch((error) => {
            const errorCode = error.code;
        });
}

document.getElementById("Form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement registration logic here
    signIn(userEmail.value, userPassword.value);
});
