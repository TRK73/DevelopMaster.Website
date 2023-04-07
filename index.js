const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register-link');
const showLoginLink = document.getElementById('show-login-link');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginErrorMessage = document.getElementById('login-error-message');
const registerErrorMessage = document.getElementById('register-error-message');

// Show login section by default and hide register section
loginSection.style.display = 'block';
registerSection.style.display = 'none';

// Handle show register link click
showRegisterLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

// Handle show login link click
showLoginLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
});

// Handle login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            loginErrorMessage.style.display = 'none';
            loginForm.reset();
            window.location.href = 'profile.html';
        })
        .catch(error => {
            loginErrorMessage.style.display = 'block';
            loginErrorMessage.textContent = error.message;
        });
});

// Handle register form submission
registerForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = registerForm['register-email'].value;
  const password = registerForm['register-password'].value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
          registerErrorMessage.style.display = 'none';
          registerForm.reset();
          window.location.href = 'index.html';
      })
      .catch(error => {
          registerErrorMessage.style.display = 'block';
          registerErrorMessage.textContent = error.message;
      });
});