import axios from "axios";

const name = document.getElementById('name') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const message = document.getElementById('message') as HTMLTextAreaElement;
const submitButton = document.getElementById('submit_button') as HTMLButtonElement;

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // implement submit functionality here:
    if (
        name.value === "" ||
        email.value === "" ||
        message.value === ""

    ) {
        alert("Some fields are blank!")
        return;
    }
    
    console.log("first name: ", name.value);
    console.log("email: ", email.value);
    console.log("field: ,", message.value);

    const response = await axios.post("http://localhost:3000/api/send-email", {
        name: name.value,
        email: email.value,
        message: message.value
    });

    console.log(response.data);

    alert("form has been submitted!");
})
