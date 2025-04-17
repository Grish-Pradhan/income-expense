// auth.js

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;

      if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
      }

      const userData = {
        name,
        email,
        password
      };

      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      alert('Registration successful! You can now log in.');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      const storedUser = JSON.parse(localStorage.getItem(`user_${email}`));

      if (storedUser && storedUser.password === password) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        alert(`Welcome back, ${storedUser.name}!`);
        window.location.href = 'index.html';
      } else {
        alert('Invalid email or password!');
      }
    });
  }
});

// Dark/Light Mode Toggle
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
}


