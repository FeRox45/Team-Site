import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getDatabase,
    ref,
    update,
    get,
    child,
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
const database = getDatabase(app);
const profilesRef = ref(database, "profiles");
const provider = new GoogleAuthProvider();

const userEmail = document.getElementById("Email");
const userPassword = document.getElementById("Password");

function SuccesAuth() {
    alert("Ви успішно увійшли в систему");
    window.location.href = "/";
}

async function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem(
                "EmailToken",
                JSON.stringify({
                    email: email,
                    password: password,
                })
            );
            SuccesAuth();
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                document.querySelector("p").innerText =
                    "Неправильна пошта або пароль";
                // Додайте код для обробки випадку неправильного пароля
            } else {
                console.error(error.code);
            }
        });
}

function auth_Google() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            localStorage.setItem("GoogleToken", token);

            get(child(profilesRef, `${user.uid}`))
                .then((snapshot) => {
                    if (!snapshot.exists()) {
                        const profile_data = {
                            UserName: user.displayName,
                            email: user.email,
                            quizs: null,
                            compl_quiz: null,
                            true_ans: 0,
                            wrong_ans: 0,
                        };

                        update(profilesRef, { [user.uid]: profile_data })
                            .then(() => {
                                SuccesAuth();
                            })
                            .catch((error) => {
                                console.error(
                                    "Error adding new user data: ",
                                    error
                                );
                            });
                    } else {
                        SuccesAuth();
                    }
                })
                .catch((error) => {
                    console.error("Error checking user data: ", error);
                });
        })
        .catch((error) => {
            console.error("Error signing in: ", error);
        });
}

window.auth_Google = auth_Google;

document.getElementById("Form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement registration logic here
    signIn(userEmail.value, userPassword.value);
});
