// type User = {
//     Username: string,
//     Email: string,
//     Password: string
// }

// let users: User[] = []

// const usernameInput = document.getElementById("username_input") as HTMLInputElement;
// const emailInput = document.getElementById("email_input") as HTMLInputElement;
// const passwordInput = document.getElementById("password_input") as HTMLInputElement;
// const loginButton = document.getElementById("login_button") as HTMLButtonElement;

// loginButton.addEventListener("click", () => {
//     const username = usernameInput.value;
//     const email = emailInput.value;
//     const password = passwordInput.value;

//     if (username === "" || email === "" || password === "") {
//         alert("Please fill in all the fields")
//     }

//     const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailpattern.test(email)) {
//         alert("Please enter a valid Email");
//         return;
//     }  

//     const existinguser = users.find((user) => user.Email === email)

//     if (existinguser) {
        
//         if(existinguser.Password === password) {
//             alert(`Welcome Back ${existinguser.Username}`)
//             usernameInput.value = "";
//             emailInput.value = "";
//             passwordInput.value = "";
//         } else {
//             alert("Incorrect password")
//             passwordInput.value = "";
//         }

//     } else {
//         const newUser: User = {Username: username, Email: email, Password: password}
//         users.push(newUser)
//         alert(`Account Created, Welcome ${newUser.Username}`)
//         usernameInput.value = "";
//         emailInput.value = "";
//         passwordInput.value = "";
//     }


// })





