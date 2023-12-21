let clickCounter = 0;

// Get the modal elements
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

function togglePasswordVisibility(inputField) {
    const type =
        inputField.getAttribute("type") === "password" ? "text" : "password";
    inputField.setAttribute("type", type);
}
const btnShowPass = document.getElementById("showPassword");
btnShowPass.addEventListener("click", function () {
    const registerPassword = document.getElementById("Password");
    clickCounter++;
    togglePasswordVisibility(registerPassword);
    switch (clickCounter % 2) {
        case 1:
            btnShowPass.innerHTML = "Сховати";
            break;
        case 0:
            btnShowPass.innerHTML = "Показати";
            break;
    }
});
