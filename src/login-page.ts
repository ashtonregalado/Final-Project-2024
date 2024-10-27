//Login page

import { users } from "./useraccounts";

const emailInput = document.getElementById("email_input") as HTMLInputElement;
const passwordInput = document.getElementById("password_input") as HTMLInputElement;
const loginButton = document.getElementById("login_button") as HTMLButtonElement;
const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement;
const toggleIcon = document.getElementById('toggleIcon') as HTMLImageElement;

const showIcon = 'src/images/show.png'; // Path to show icon
const hideIcon = 'src/images/hide.png'; // Path to hide icon

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleIcon.src = type === 'password' ? hideIcon : showIcon; // Switch icon based on visibility
});

loginButton.addEventListener("click", () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === "" || password === "") {
        alert("Please fill in all the fields")
    }

    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailpattern.test(email)) {
        alert("Please enter a valid Email");
        return;
    }  

    const existinguser = users.find((user) => user.Email === email)

    if (existinguser) {
        
        if(existinguser.Password === password) {
            alert(`Welcome Back ${existinguser.Username}`)

            emailInput.value = "";
            passwordInput.value = "";
        } else {
            alert("Incorrect Password")
            passwordInput.value = "";
        }

    }

})
