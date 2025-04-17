let totalIncome = 0;
let totalSpent = 0;
let chart; // Global chart reference

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

function updateTotals() {
  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
  document.getElementById("totalSpent").textContent = totalSpent.toFixed(2);
  document.getElementById("remaining").textContent = (totalIncome - totalSpent).toFixed(2);
}

function updateChart() {
  const chartType = document.getElementById("chartType").value;

  if (chart) chart.destroy();  // Destroy the old chart before creating a new one

  const ctx = document.getElementById("expenseChart").getContext("2d");

  chart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: ["Income", "Spent"],
      datasets: [{
        label: "Financial Overview",
        data: [totalIncome, totalSpent],
        backgroundColor: [
          "rgba(0, 200, 81, 0.7)",  // Green for income
          "rgba(255, 99, 132, 0.7)" // Red for spent
        ],
        borderColor: [
          "rgba(0, 200, 81, 1)",  // Green border for income
          "rgba(255, 99, 132, 1)" // Red border for spent
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

// Dark/Light Mode Toggle
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// Export Data as CSV
function downloadCSV() {
  const data = [
    ['Income Source', 'Amount'],
    ['Total Income', totalIncome.toFixed(2)],
    ['Total Spent', totalSpent.toFixed(2)],
    ['Remaining', (totalIncome - totalSpent).toFixed(2)],
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  data.forEach(row => {
    csvContent += row.join(",") + "\n";
  });

  // Create a link to trigger download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "financial_data.csv");
  link.click();
}

// Event listener for Export button
document.getElementById("exportBtn").addEventListener("click", downloadCSV);
