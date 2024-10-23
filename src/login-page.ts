//Login page

import { users } from "./useraccounts";

const emailInput = document.getElementById("email_input") as HTMLInputElement;
const passwordInput = document.getElementById("password_input") as HTMLInputElement;
const loginButton = document.getElementById("login_button") as HTMLButtonElement;

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
            alert("Incorrect ")
            passwordInput.value = "";
        }

    }

})
