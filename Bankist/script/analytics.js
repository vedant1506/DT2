document.addEventListener('DOMContentLoaded', function() {
    // Get accounts data from localStorage
    const accounts = JSON.parse(localStorage.getItem('myTab')) || [];

    // Calculate total transactions for each category
    const categoryTotals = {
        Food: 0,
        Education: 0,
        Transport: 0,
        Health: 0,
        Other: 0
    };

    accounts.forEach(account => {
        switch(account.shortName) {
            case 'fd':
                categoryTotals.Food = Math.abs(account.movements.reduce((acc, mov) => acc + mov[0], 0));
                break;
            case 'ed':
                categoryTotals.Education = Math.abs(account.movements.reduce((acc, mov) => acc + mov[0], 0));
                break;
            case 'tr':
                categoryTotals.Transport = Math.abs(account.movements.reduce((acc, mov) => acc + mov[0], 0));
                break;
            case 'hl':
                categoryTotals.Health = Math.abs(account.movements.reduce((acc, mov) => acc + mov[0], 0));
                break;
            case 'o':
                categoryTotals.Other = Math.abs(account.movements.reduce((acc, mov) => acc + mov[0], 0));
                break;
        }
    });

    // Create the chart
    const ctx = document.getElementById('transactionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                label: 'Transaction Amounts',
                data: Object.values(categoryTotals),
                backgroundColor: 'rgba(127, 224, 215, 0.8)',
                borderColor: 'rgba(127, 224, 215, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
});