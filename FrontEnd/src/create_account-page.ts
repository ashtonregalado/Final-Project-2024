//Create Account Page

import { User, users, saveUsers } from './useraccounts';

const usernameInput = document.getElementById('username_input') as HTMLInputElement;
const emailInput = document.getElementById('email_input') as HTMLInputElement;
const passwordInput = document.getElementById('password_input') as HTMLInputElement;
const signupButton = document.getElementById('signup_button') as HTMLButtonElement;
const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement;
const toggleIcon = document.getElementById('toggleIcon') as HTMLImageElement;

const showIcon = 'src/images/show.png'; // Path to show icon
const hideIcon = 'src/images/hide.png'; // Path to hide icon

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleIcon.src = type === 'password' ? hideIcon : showIcon; // Switch icon based on visibility
});

signupButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (username === '' || email === '' || password === '') {
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
    const invalidEmailMessage = document.getElementById('invalid_email_message')!;
    invalidEmailMessage.style.display = 'flex';

    const tryEmailButton = invalidEmailMessage.querySelector<HTMLButtonElement>('#try_email_again');
    tryEmailButton?.addEventListener('click', () => {
      invalidEmailMessage.style.display = 'none';
    });

    return; // Exit function early since email is invalid
  }

  const existinguser = users.find((user) => user.Email === email);

  if (existinguser) {
    const emailInUseMessage = document.getElementById('email_in_use_message')!;
    emailInUseMessage.style.display = 'flex';

    const tryEmailInUseButton = emailInUseMessage.querySelector<HTMLButtonElement>('#try_email_in_use_again');
    tryEmailInUseButton?.addEventListener('click', () => {
      emailInUseMessage.style.display = 'none';
    });

    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    return; // Exit function early since email is already in use
  }

  const newUser: User = { Username: username, Email: email, Password: password };

  users.push(newUser);

  saveUsers(users);

  alert(`Account Created, Welcome ${newUser.Username}`);
  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  window.location.href = 'upload_page/home_page.html';
});
