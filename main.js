// main.js - Optional file to handle additional frontend logic

// You can add code here to manage UI interactions, fetch data, handle dynamic updates, etc.

// For example: A simple function to toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

// Add event listener for a button that toggles dark mode
document.getElementById('darkModeBtn')?.addEventListener('click', toggleDarkMode);

// Fetch and display expenses on the dashboard page (example)
if (window.location.pathname === '/index.html') {
  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.length > 0) {
      const expenseList = document.getElementById('expenseList');
      data.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: $${expense.amount}`;
        expenseList.appendChild(li);
      });
    } else {
      alert('No expenses found');
    }
  };

  fetchExpenses();
}
