import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

        // Зберегти дані користувача в localStorage
        const user = {
            email: email,
            password: password,
        };
        localStorage.setItem("user", JSON.stringify(user));
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
