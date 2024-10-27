//Create Account Page

import { User, users, saveUsers } from "./useraccounts";


const usernameInput = document.getElementById("username_input") as HTMLInputElement;
const emailInput = document.getElementById("email_input") as HTMLInputElement;
const passwordInput = document.getElementById("password_input") as HTMLInputElement;
const signupButton = document.getElementById("signup_button") as HTMLButtonElement;
const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement;
const toggleIcon = document.getElementById('toggleIcon') as HTMLImageElement;

const showIcon = 'src/images/show.png'; // Path to show icon
const hideIcon = 'src/images/hide.png'; // Path to hide icon

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleIcon.src = type === 'password' ? hideIcon : showIcon; // Switch icon based on visibility
});

signupButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all the fields")
        return;
    }

    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailpattern.test(email)) {
        alert("Please enter a valid Email");
        return;
    }  

    const existinguser = users.find((user) => user.Email)

    if (existinguser?.Email === email) {
        alert("Email already in use")
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        return;
    }

    const newUser: User = {Username: username, Email: email, Password: password}

    users.push(newUser)

    saveUsers(users)

    alert(`Account Created, Welcome ${newUser.Username}`)
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
})


