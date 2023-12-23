import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    EmailAuthProvider,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

var googleAccessToken = localStorage.getItem("GoogleToken");
var EmailToken = localStorage.getItem("EmailToken");

function signInWithGoogleToken(googleAccessToken) {
    if (googleAccessToken) {
        // Використання токену для аутентифікації
        var credential = GoogleAuthProvider.credential(null, googleAccessToken);

        signInWithCredential(auth, credential)
            .then((userCredential) => {
                var user = userCredential.user;
                if (user.emailVerified) {
                    Succes();
                }
            })
            .catch((error) => {
                console.error("Error signing in with Google token:", error);
            });
    }
}

function signInWithEmailToken(EmailToken) {
    if (EmailToken) {
        EmailToken = JSON.parse(EmailToken);
        var credential = EmailAuthProvider.credential(
            EmailToken.email,
            EmailToken.password
        );
        console.log(credential);
        signInWithCredential(auth, credential)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    Succes();
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(error);
            });
    }
}

if (auth.currentUser == null) {
    signInWithGoogleToken(googleAccessToken);
    signInWithEmailToken(EmailToken);
} else {
    if (auth.currentUser) {
        Succes();
    }
}

const all_quiz = document.querySelector(".all_quiz");
const url_complete_quiz = "complete-quiz";

fetch("/all_test")
    .then((response) => response.json())
    .then((data) => {
        let num = 0;
        // Тут ви можете вивести дані в консоль або використати їх інакше
        if (!data) {
            return;
        }
        data.forEach((item, index) => {
            if (item != null) {
                const quiz = document.createElement("div");
                const title = document.createElement("h1");
                const quiz_num = document.createElement("h3");
                const avtor_quiz = document.createElement("a");
                // Ading classes
                quiz.classList.add("button_quiz");
                quiz_num.classList.add("button_num_quiz");
                avtor_quiz.classList.add("avtor_quiz");
                // Adding elements
                quiz_num.innerText = `Quiz ${num + 1}`;
                title.innerText = item.title;
                avtor_quiz.innerText = `Автор: ${item.author}`;
                avtor_quiz.href = "/";
                quiz.id = index;
                quiz.addEventListener("click", () => test_func(quiz.id));
                quiz.append(quiz_num, title, avtor_quiz);
                all_quiz.append(quiz);
                num++;
            }
        });
    })
    .catch((error) => console.error("Error:", error));

function test_func(id) {
    window.location.href = `/${url_complete_quiz}/${id}`;
}

function Succes() {
    const add_quiz = document.getElementById("add_quiz");
    const container = document.querySelector(".select-bar div");
    const profile_btn = document.createElement("a");
    profile_btn.href = "/profile";
    profile_btn.innerText = "Перейти в профіль";
    container.innerHTML = "";
    container.append(profile_btn);

    add_quiz.href = "add-quiz";
    add_quiz.onclick = "";
}
