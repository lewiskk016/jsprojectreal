let myChart

fetch('data/eur_usd.json')
  .then(response => response.json())
  .then(data => {
    createChart(data);
  })
  .catch(error => {
    console.error('Error retrieving currency data:', error);
  });

function createChart(data) {
  const currencySelect = document.getElementById('currency');
  currencySelect.addEventListener('change', function() {
    const selectedCurrency = currencySelect.value;
    const dataFile = 'data/gbp_usd.json';

    fetch(dataFile)
      .then(response => response.json())
      .then(data => {
        myChart.data.labels = data.observations.map(entry => entry.date);
        myChart.data.datasets[0].data = data.observations.map(entry => entry.value);
        myChart.update();
      })
      .catch(error => {
        console.error('Error retrieving currency data:', error);
      });
  });

  const dates = data.observations.map(entry => entry.date);
  const values = data.observations.map(entry => entry.value);

  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, { // Assign the created chart to myChart
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Currency Data',
        data: values,
        borderColor: 'rgba (10, 10, 10, 1)',
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0.0000,
          suggestedMax: 1.70000
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            rangeMin: {
              x: null,
              y: null
            },
            rangeMax: {
              x: null,
              y: null
            },
            onPan: function ({ chart }) {
              console.log("Panning!");
            },
            onPanComplete: function ({ chart }) {
              console.log("Panned!");
            }
          },
          zoom: {
            enabled: true,
            mode: 'xy',
            rangeMin: {
              x: null,
              y: 0 // minimum zoom level
            },
            rangeMax: {
              x: null, //
              y: 1.6 // maximum zoom level
            },
            speed: .1,
            threshold: 2,
            sensitivity: 3,
            onZoom: function ({ chart }) {
              console.log("Zooming!");
            },
            onZoomComplete: function ({ chart }) {
              console.log("Zoomed!");
            }
          },
          scrollbar: {
            enabled: true,
          }
        }
      }
    }
  });
}






















// fetch('data/eurusd2.json')
//   .then(response => response.json())
//   .then(data => {
//     createChart(data);
//   })
//   .catch(error => {
//     console.error('Error retrieving currency data:', error);
//   });

// function createChart(data) {


//   const currencySelect = document.getElementById('currency');
//   currencySelect.addEventListener('change', function() {
//   const selectedCurrency = currencySelect.value;
//   const dataFile = 'data/gbp.json';

//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         myChart.data.labels = data.observations.map(entry => entry.date);
//         myChart.data.datasets[0].data = data.observations.map(entry => entry.value);
//         myChart.update();
//       })
//       .catch(error => {
//         console.error('Error retrieving currency data:', error);
//       });
//   });


//   const dates = data.observations.map(entry => entry.date);
//   const values = data.observations.map(entry => entry.value);

//   const ctx = document.getElementById('myChart').getContext('2d');
//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: dates,
//       datasets: [{
//         label: 'Currency Data',
//         data: values,
//         borderColor: 'rgba (10, 10, 10, 1)',
//         fill: false
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           suggestedMin: 0.0000,
//           suggestedMax: 1.70000
//         }
//       },
//       plugins: {
//         zoom: {
//           pan: {
//             enabled: true,
//             mode: 'xy',
//             rangeMin: {
//               x: null,
//               y: null
//             },
//             rangeMax: {
//               x: null,
//               y: null
//             },
//             onPan: function ({ chart }) {
//               console.log("Panning!");
//             },
//             onPanComplete: function ({ chart }) {
//               console.log("Panned!");
//             }
//           },
//           zoom: {
//             enabled: true,
//             mode: 'xy',
//             rangeMin: {
//               x: null,
//               y: 0 // minimum zoom level
//             },
//             rangeMax: {
//               x: null, //
//               y: 1.6 // maximum zoom level
//             },
//             speed: .1,
//             threshold: 2,
//             sensitivity: 3,
//             onZoom: function ({ chart }) {
//               console.log("Zooming!");
//             },
//             onZoomComplete: function ({ chart }) {
//               console.log("Zoomed!");
//             }
//           },
//           scrollbar: {
//             enabled: true,
//           }

//         }
//       }

//     }
//   });
// }











// function createChart(data) {
//   const dates = data.observations.map(entry => entry.date);
//   const values = data.observations.map(entry => entry.value);

//   const ctx = document.getElementById('myChart').getContext('2d');
//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: dates,
//       datasets: [{
//         label: 'Currency Data',
//         data: values,
//         borderColor: 'rgba (10, 10, 10, 1)',
//         fill: false
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           suggestedMin: 0.00
//         }
//       },
//       plugins: {
//         zoom: {
//           pan: {
//             enabled: true,
//             mode: 'xy',
//             rangeMin: {
//               x: null,
//               y: null
//             },
//             rangeMax: {
//               x: null,
//               y: null
//             },
//             onPan: function ({ chart }) {
//               console.log("Panning!");
//             },
//             onPanComplete: function ({ chart }) {
//               console.log("Panned!");
//             }
//           },
//           zoom: {
//             enabled: true,
//             mode: 'xy',
//             rangeMin: {
//               x: 0,
//               y: .75 // minimum zoom level
//             },
//             rangeMax: {
//               x: 0, //
//               y: 1.6 // maximum zoom level
//             },
//             speed: .1,
//             threshold: 2,
//             sensitivity: 3,
//             onZoom: function ({ chart }) {
//               console.log("Zooming!");
//             },
//             onZoomComplete: function ({ chart }) {
//               console.log("Zoomed!");
//             }
//           },
//           scrollbar: {
//             enabled: true,
//           }
//         },

//
//
//


//         event listeners for dropdown menus
//         onRefresh: function(chart) {
//           const indicatorSelect = document.getElementById('indicator');
//           const macroDataSelect = document.getElementById('macroData');
              //const currencySelect = document.getElementById('currency');

//           // Event listener for the indicator dropdown menu
//           indicatorSelect.addEventListener('change', function() {
//             const selectedIndicator = indicatorSelect.value;
//             // Modify the chart based on the selected indicator
//             // Example: Update chart title
//             chart.options.plugins.title.text = `Currency Data - ${selectedIndicator}`;
//             chart.update();
//           });

//           // Event listener for the macro data dropdown menu
//           macroDataSelect.addEventListener('change', function() {
//             const selectedMacroData = macroDataSelect.value;
//             // Modify the chart based on the selected macro data
//             // Example: Update chart labels or dataset
//             chart.data.labels = updatedLabels;
//             chart.data.datasets[0].data = updatedData;
//             chart.update();
//           });

              // Event listener for the currency dropdown menu
//           currencySelect.addEventListener('change', function() {
//             const selectedCurrency = currencySelect.value;
//             // Modify the chart based on the selected currency
//             // Example: Update chart labels or dataset
//             chart.data.labels = updatedLabels;
//             chart.data.datasets[0].data = updatedData;
//             chart.update();
//           });
//         }
//       }
//     }
//   });
// }
