fetch('data/eurusd.json')
  .then(response => response.json())
  .then(data => {
    createChart(data);
  })
  .catch(error => {
    console.error('Error retrieving currency data:', error);
  });


function createChart(data) {
    const dates = data.observations.map(entry => entry.date);
    const values = data.observations.map(entry => entry.value);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Currency Data',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)', // Customize the color as needed
          fill: false
        }]
      },
      options: {
        // Configure additional options as needed
      }
    });
  }
