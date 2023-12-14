// Get the modal elements
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// Display login modal when login button is clicked
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
});

// Hide login modal when close button is clicked
document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    });
});

// Display register modal when register button is clicked
registerBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
});

// Handling form submissions (you may add further logic for backend processing)
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log("Login logic goes here");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement registration logic here
    console.log("Registration logic goes here");
});

// This is your existing JavaScript code
// Get the modal elements, event listeners, etc.

// Function to toggle password visibility
function togglePasswordVisibility(inputField) {
    const type =
        inputField.getAttribute("type") === "password" ? "text" : "password";
    inputField.setAttribute("type", type);
}

document
    .getElementById("showLoginPassword")
    .addEventListener("click", function () {
        const loginPassword = document.getElementById("password");
        togglePasswordVisibility(loginPassword);
    });

document
    .getElementById("showRegisterPassword")
    .addEventListener("click", function () {
        const registerPassword = document.getElementById("newPassword");
        togglePasswordVisibility(registerPassword);
    });

// Handling form submissions (your existing code for login and registration form submissions)
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log("Login logic goes here");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement registration logic here
    console.log("Registration logic goes here");
});
