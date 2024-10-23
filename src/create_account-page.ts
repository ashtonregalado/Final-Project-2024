//Create Account Page

import { User, users, saveUsers } from "./useraccounts";


const usernameInput = document.getElementById("username_input") as HTMLInputElement;
const emailInput = document.getElementById("email_input") as HTMLInputElement;
const passwordInput = document.getElementById("password_input") as HTMLInputElement;
const create_accountButton = document.getElementById("create-account_button") as HTMLButtonElement;

create_accountButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all the fields")
    }

    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailpattern.test(email)) {
        alert("Please enter a valid Email");
        return;
    }  

    const existinguser = users.find((user) => user.Email)

    if (existinguser?.Email === email) {
        alert("Account already exist")
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


