//Login page

import { users } from './useraccounts';

const emailInput = document.getElementById('email_input') as HTMLInputElement;
const passwordInput = document.getElementById('password_input') as HTMLInputElement;
const loginButton = document.getElementById('login_button') as HTMLButtonElement;
const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement;
const toggleIcon = document.getElementById('toggleIcon') as HTMLImageElement;

const showIcon = 'src/images/show.png'; // Path to show icon
const hideIcon = 'src/images/hide.png'; // Path to hide icon

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleIcon.src = type === 'password' ? hideIcon : showIcon; // Switch icon based on visibility
});

loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email === '' || password === '') {
    const fieldsMessage = document.getElementById('incomplete_fields_message')!;
    fieldsMessage.style.display = 'flex';

    const fillFieldsButton = fieldsMessage.querySelector<HTMLButtonElement>('#fill_fields_again');
    fillFieldsButton?.addEventListener('click', () => {
      fieldsMessage.style.display = 'none';
    });

    return; // Exit function early since fields are incomplete
  }

  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailpattern.test(email)) {
    alert('Please enter a valid Email');
    return;
  }

  const existinguser = users.find((user) => user.Email === email);

  if (!existinguser) {
    // Handle incorrect email
    const incorrectEmailMessage = document.createElement('div');
    incorrectEmailMessage.classList.add('incorrect_email');
    incorrectEmailMessage.innerHTML = `
      <h3 class="email_message">Email Not Found!</h3>
      <button class="email_button" id="try_email_again">Try Again</button>`;

    document.body.appendChild(incorrectEmailMessage);

    emailInput.value = ''; // Clear email input field
    const tryEmailAgainButton = incorrectEmailMessage.querySelector<HTMLButtonElement>('#try_email_again');

    if (tryEmailAgainButton) {
      tryEmailAgainButton.addEventListener('click', () => {
        incorrectEmailMessage.remove();
      });
    }

    return; // Exit further execution
  }

  if (existinguser.Password === password) {
    alert(`Welcome Back ${existinguser.Username}`);

    emailInput.value = '';
    passwordInput.value = '';
    window.location.href = 'upload_page/home_page.html';
  } else {
    // Handle incorrect password
    const incoPassMessage = document.createElement('div');
    incoPassMessage.classList.add('incorrect_password');
    incoPassMessage.innerHTML = `
      <h3 class="inco_message">Incorrect Password!</h3>
      <button class="inco_button" id="try_again">Try Again</button>`;

    document.body.appendChild(incoPassMessage);

    passwordInput.value = '';
    const tryAgainButton = incoPassMessage.querySelector<HTMLButtonElement>('#try_again');

    if (tryAgainButton) {
      tryAgainButton.addEventListener('click', () => {
        incoPassMessage.remove();
      });
    }
  }
});
