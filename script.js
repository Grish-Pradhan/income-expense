let totalIncome = 0;
let totalSpent = 0;
let chart; // Global chart reference

// Add Income Function
function addIncome() {
  const source = document.getElementById("incomeSource").value.trim();
  const amount = parseFloat(document.getElementById("incomeAmount").value);

  if (source && !isNaN(amount) && amount > 0) {
    totalIncome += amount;
    updateTotals();
    updateChart();
    document.getElementById("incomeSource").value = "";
    document.getElementById("incomeAmount").value = "";
  } else {
    alert("Please enter valid income details.");
  }
}

// Add Expense Function
function addExpense() {
  const topic = document.getElementById("topic").value.trim();
  const cost = parseFloat(document.getElementById("cost").value);
  const times = parseFloat(document.getElementById("times").value);

  if (topic && !isNaN(cost) && !isNaN(times) && cost > 0 && times > 0) {
    const expense = cost * times;
    totalSpent += expense;
    updateTotals();
    updateChart();
    document.getElementById("topic").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("times").value = "";
  } else {
    alert("Please fill in valid expense details.");
  }
}

// Update totals section
function updateTotals() {
  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
  document.getElementById("totalSpent").textContent = totalSpent.toFixed(2);
  document.getElementById("remaining").textContent = (totalIncome - totalSpent).toFixed(2);
}

// Update the chart
function updateChart() {
  const chartType = document.getElementById("chartType").value;

  if (chart) chart.destroy(); // Prevent chart overlap

  const ctx = document.getElementById("expenseChart").getContext("2d");

  chart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: ["Income", "Spent"],
      datasets: [{
        label: "Financial Overview",
        data: [totalIncome, totalSpent],
        backgroundColor: [
          "rgba(0, 200, 81, 0.7)",
          "rgba(255, 99, 132, 0.7)"
        ],
        borderColor: [
          "rgba(0, 200, 81, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: chartType === 'pie',
        }
      }
    }
  });
}

// Toggle Dark/Light Mode
const modeToggleBtn = document.getElementById("modeToggle");
modeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Update toggle text
  const isDark = document.body.classList.contains("dark");
  modeToggleBtn.textContent = isDark
    ? "🌙 Switch to Light Mode"
    : "🌑 Switch to Dark Mode";

  // Optionally store mode in local storage
  localStorage.setItem("mode", isDark ? "dark" : "light");
});

// On page load, set dark mode if stored
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    modeToggleBtn.textContent = "🌙 Switch to Light Mode";
  } else {
    modeToggleBtn.textContent = "🌑 Switch to Dark Mode";
  }
});

// Export Data as CSV
function downloadCSV() {
  const data = [
    ['Category', 'Amount'],
    ['Total Income', totalIncome.toFixed(2)],
    ['Total Spent', totalSpent.toFixed(2)],
    ['Remaining', (totalIncome - totalSpent).toFixed(2)],
  ];

  let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "financial_data.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
}

// Export button event
document.getElementById("exportBtn").addEventListener("click", downloadCSV);
