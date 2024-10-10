document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('historyChart').getContext('2d');
    const historyData = JSON.parse(localStorage.getItem('historyData')) || {};

    // Get current month days and data
    const currentMonth = new Date().getMonth();
    const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const data = labels.map(day => {
        const date = new Date(new Date().getFullYear(), currentMonth, day).toISOString().split('T')[0];
        return historyData[date] ? (historyData[date] / 1130) * 100 : 0;
    });

    // Filter labels and data to show only every 5th day
    const filteredLabels = labels.filter((_, index) => index % 5 === 0);
    const filteredData = data.filter((_, index) => index % 5 === 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: filteredLabels,
            datasets: [{
                label: 'Water Consumption (%)',
                data: filteredData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                },
                x: {
                    beginAtZero: true
                }
            }
        }
    });

    // Event listener for the "Back" button
    document.querySelector('.back-button').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});
