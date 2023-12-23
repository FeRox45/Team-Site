import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    EmailAuthProvider,
    signInWithCredential,
    GoogleAuthProvider,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const storage = getStorage(app);

let user_data = {};

var googleAccessToken = localStorage.getItem("GoogleToken");
var EmailToken = localStorage.getItem("EmailToken");

function signInWithGoogleToken(googleAccessToken) {
    if (googleAccessToken) {
        // Використання токену для аутентифікації
        var credential = GoogleAuthProvider.credential(null, googleAccessToken);

        signInWithCredential(auth, credential)
            .then((userCredential) => {
                const user = userCredential.user;
                user_data = {
                    userName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                };
                SetProfileData(user_data);
            })
            .catch((error) => {
                console.error("Error signing in with Google token:", error);
            });
    } else {
        console.log("Google access token not found");
    }
}

function signInWithEmailToken(EmailToken) {
    if (EmailToken) {
        EmailToken = JSON.parse(EmailToken);
        var credential = EmailAuthProvider.credential(
            EmailToken.email,
            EmailToken.password
        );
        signInWithCredential(auth, credential)
            .then((userCredential) => {
                const user = userCredential.user;
                user_data = {
                    photoUrl: user.photoURL,
                    userName: user.displayName,
                    email: user.email,
                };
                SetProfileData(user_data);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(error);
            });
    }
}

signInWithGoogleToken(googleAccessToken);
signInWithEmailToken(EmailToken);

const base_img_profile =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
const profile_img = document.querySelector(".avatar");
const profile_nickname = document.getElementById("Nickname");
const profile_email = document.getElementById("Email");

async function SetProfileData(data) {
    if (data.photoUrl != null) {
        try {
            const response = await fetch(data.photoUrl, {
                method: "HEAD",
            });
            const error = await response.json();
            if (error.message === "Not Found.") {
                profile_img.src = base_img_profile;
                await updateProfile(auth.currentUser, {
                    photoURL: "",
                });
            } else {
                profile_img.src = data.photoUrl;
            }
        } catch (error) {
            profile_img.src = data.photoUrl;
        }
    } else {
        profile_img.src = base_img_profile;
    }
    profile_nickname.innerText = data.userName;
    profile_email.innerText = `Пошта: ${data.email}`;
}

const fileInput = document.getElementById("avatarInput");
const avatarImage = document.getElementById("avatarImage");

window.triggerFileInput = function () {
    fileInput.click();
};

fileInput.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            if (avatarImage) {
                const storageRef = ref(
                    storage,
                    `${auth.currentUser.uid}/avatar.png`
                );
                uploadBytes(storageRef, selectedFile).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                        });
                        avatarImage.src = downloadURL;
                        console.log("succes");
                    });
                });
            } else {
                console.error("Element with id 'avatarImage' not found");
            }
        };
        reader.readAsDataURL(selectedFile);
    }
});
