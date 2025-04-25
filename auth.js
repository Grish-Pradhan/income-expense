document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  // Redirect to dashboard if already logged in
  if (sessionStorage.getItem('loggedInUser') && window.location.pathname.includes('login')) {
    window.location.href = 'index.html';
  }

  // Register functionality
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { name, email, password } = registerForm;

      if (!name.value.trim() || !email.value.trim() || !password.value) {
        return alert('Please fill in all fields.');
      }

      const userData = {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value
      };

      localStorage.setItem(`user_${userData.email}`, JSON.stringify(userData));
      alert('Registration successful! You can now log in.');
      window.location.href = 'login.html';
    });
  }

  // Login functionality
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { email, password } = loginForm;

      const storedUser = JSON.parse(localStorage.getItem(`user_${email.value.trim()}`));

      if (storedUser && storedUser.password === password.value) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        alert(`Welcome back, ${storedUser.name}!`);
        window.location.href = 'index.html';
      } else {
        alert('Invalid email or password!');
      }
    });
  }
});

// Toggle Dark/Light Mode
function toggleMode() {
  document.body.classList.toggle('dark'); // Toggle dark mode
  // Save the theme preference to localStorage
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme on page load
window.onload = function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};
