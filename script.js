let currencyData;
let macroData;


fetch('data/eur_usd_m.json')
  .then(response => response.json())
  .then(currencyData => {
    console.log('Currency data:', currencyData);
    fetch('data/cpi.json')
      .then(response => response.json())
      .then(macroData => {
        console.log('Macro data:', macroData);
        createChart(currencyData, macroData);
      })
      .catch(error => {
        console.error('Error retrieving macro data:', error);
      });
  })
  .catch(error => {
    console.error('Error retrieving currency data:', error);
  });

function createChart(currencyData, macroData) {
  const currencySelect = document.getElementById('currency');
  const macroDataSelect = document.getElementById('macroData');
  const ctx = document.getElementById('myChart').getContext('2d');
  let myChart = null;

  function updateChart(updatedCurrencyData, updatedMacroData) {
    const currencyDates = updatedCurrencyData.observations.map(entry => entry.date);
    const currencyValues = updatedCurrencyData.observations.map(entry => entry.value);
    const macroDates = updatedMacroData.observations.map(entry => entry.date);
    const macroValues = updatedMacroData.observations.map(entry => entry.value);

    myChart.data.labels = macroDates;
    // myChart.data.labels = currencyDates;
    myChart.data.datasets[0].data = currencyValues;
    myChart.data.datasets[1].data = macroValues;
    myChart.update();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: currencyData.observations.map(entry => entry.date),
      datasets: [{
        type: 'line',
        label: 'Currency Data',
        data: currencyData.observations.map(entry => entry.value),
        borderColor: 'rgb(10, 10, 200)',
        backgroundColor: 'rgb(10, 10, 200)',
        borderWidth: 1,
        fill: false,
        yAxisID: 'currency',
        // xAxisID: 'currency-x-axis',
      },
      {
        type: 'line',
        label: 'Macro Data',
        data: macroData.observations.map(entry => entry.value),
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
        yAxisID: 'macro',
        // xAxisID: 'macro-x-axis',
        // display: true,

      }]
    },
    options: {
      tooltips: {
        mode: 'index',
      },
      scales: {
        yAxes: [{
          id: 'currency',
          type: 'linear',
          position: 'left',
          display: true,
      }, {
          id: 'macro',
          type: 'linear',
          position: 'right',
          display: true,
      }],


      },
      plugins: {
        decimation: {
          enabled: true,
          algorithm: 'lttb',
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
      elements: {
        line: {
          tension: 1,
        },
      },
    }
  });

  currencySelect.addEventListener('change', function() {
    const selectedCurrency = currencySelect.value;
    let dataFile;

    if (selectedCurrency === 'currency0') {
      dataFile = 'data/eur_usd_m.json';
    } else if (selectedCurrency === 'currency1') {
      dataFile = 'data/gbp_usd_m.json';
    } else if (selectedCurrency === 'currency2') {
      dataFile = 'data/usd_chf_m.json';
    } else if (selectedCurrency === 'currency3') {
      dataFile = 'data/usd_jpy_m.json';
    }

    console.log('Currency data file:', dataFile);
    fetch(dataFile)
      .then(response => response.json())
      .then(data => {
        currencyData = data;
        updateChart(data, macroData);
      })
      .catch(error => {
        console.error('Error retrieving currency data:', error);
      });
  });
  macroDataSelect.addEventListener('change', function() {
        const selectedMacroData = macroDataSelect.value;
        let dataFile;


        if (selectedMacroData === 'macroData0') {
            dataFile = 'data/cpi.json';
        } else if (selectedMacroData === 'macroData1') {
            dataFile = 'data/employment.json';
        } else if (selectedMacroData === 'macroData2') {
            dataFile = 'data/fedfunds.json';
        // } else if (selectedMacroData === 'macroData3') {
        //     dataFile = 'data/gdp.json';
        }
        console.log('Macro data file:', dataFile);
        fetch(dataFile)
          .then(response => response.json())
          .then(data => {
            macroData = data;
            updateChart(currencyData, data);
          })
          .catch(error => {
            console.error('Error retrieving macro data:', error);
          });
      });
}



// xAxes: {
        //   type: 'time',
        //   ticks: {
        //     maxRotation: 0,
        //     autoSkip: true,
        //     maxTicksLimit: 10,
        // }},
        // xAxes: [{
        //   id: 'currency-x-axis',
        //   type: 'time',
        //   time: {
        //     unit: 'day',
        //   },
        //  display: true,
        //   }, {
        //   id: 'macro-x-axis',
        //   type: 'time',
        //   time: {
        //     unit: 'month',
        //   }
        // }],
          // // id: 'cc',
          // type: 'linear',

          // }, {
          // // id: 'ma',
          // type: 'linear',
          // }],








// fetch('data/eur_usd.json')
//   .then(response => response.json())
//   .then(data => {
//     createChart(data);
//   })
//   .catch(error => {
//     console.error('Error retrieving currency data:', error);
//   });

// function createChart(data) {
//   const currencySelect = document.getElementById('currency');
//   const ctx = document.getElementById('myChart').getContext('2d');
//   let myChart = null;

//   function updateChart(data) {
//     const dates = data.observations.map(entry => entry.date);
//     const values = data.observations.map(entry => entry.value);
//     myChart.data.labels = dates;
//     myChart.data.datasets[0].data = values;
//     myChart.update();
//   }

//   myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: data.observations.map(entry => entry.date),
//       datasets: [{
//         label: 'Currency Data',
//         data: data.observations.map(entry => entry.value),
//         color: 'rgb(255, 99, 132)',
//         fill: false
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           id: 'currency',
//           type: 'linear',
//           position: 'right',
//         }],
//         // y: {
//         //   type: 'linear',
//         //   min: 0.0000,
//         //   max: 1.70000,
//         //   position: 'right',
//         // },
//         // x: {
//         //   type: 'time',
//         //   min: new Date('1999-01-04').valueOf(),
//         //   max: new Date('2022-05-08').valueOf(),
//         // }
//       },
//       plugins: {
//         decimation: {
//           enabled: true,
//           algorithm: 'lttb',
//         },
//       }
//     }
//   });

//   currencySelect.addEventListener('change', function() {
//     const selectedCurrency = currencySelect.value;
//     let dataFile;

//     if (selectedCurrency === 'currency0') {
//       dataFile = 'data/eur_usd.json';
//     } else if (selectedCurrency === 'currency1') {
//       dataFile = 'data/gbp_usd.json';
//     } else if (selectedCurrency === 'currency2') {
//       dataFile = 'data/usd_chf.json';
//     } else if (selectedCurrency === 'currency3') {
//       dataFile = 'data/usd_jpy.json';
//     }

//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         updateChart(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving currency data:', error);
//       });
//   });



//   macroDataSelect.addEventListener('change', function() {
//     const selectedMacroData = macroDataSelect.value;
//     let dataFile;


//     if (selectedMacroData === 'macroData0') {
//         dataFile = 'data/cpi.json';
//     } else if (selectedMacroData === 'macroData1') {
//         dataFile = 'data/employment.json';
//     } else if (selectedMacroData === 'macroData2') {
//         dataFile = 'data/fedfunds.json';
//     }
//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         updateChart(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving macro data:', error);
//       });
//   })
// }
































// fetch('data/eur_usd.json')
//   .then(response => response.json())
//   .then(data => {
//     createChart(data);
//   })
//   .catch(error => {
//     console.error('Error retrieving currency data:', error);
//   });

// function createChart(data) {
//   const currencySelect = document.getElementById('currency');
//   const ctx = document.getElementById('myChart').getContext('2d');
//   let myChart = null;

//   function updateChart(data) {
//     const dates = data.observations.map(entry => entry.date);
//     const values = data.observations.map(entry => entry.value);
//     myChart.data.labels = dates;
//     myChart.data.datasets[0].data = values;
//     myChart.update();
//   }

//   myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: data.observations.map(entry => entry.date),
//       datasets: [{
//         label: 'Currency Data',
//         data: data.observations.map(entry => entry.value),
//         color: 'rgb(255, 99, 132)',
//         fill: false
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           type: 'linear',
//           min: 0.0000,
//           max: 1.70000,
//           // suggestedMin: 0.0000,
//           // suggestedMax: 1.70000
//         },
//         x: {
//           type: 'time',
//           min: new Date('1999-01-04').valueOf(),
//           max: new Date('2022-05-08').valueOf(),
//         }
//       },
//       padding: {
//         x: 100,
//         y: 100,
//       },
//       plugins: {
//         decimation: {
//           enabled: true,
//           algorithm: 'lttb',
//         },
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
//               y: 0
//             },
//             rangeMax: {
//               x: null,
//               y: null
//             },
//             speed: .05,
//             threshold: .5,
//             sensitivity: 2,
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

//   currencySelect.addEventListener('change', function() {
//     const selectedCurrency = currencySelect.value;
//     let dataFile;

//     if (selectedCurrency === 'currency0') {
//       dataFile = 'data/eur_usd.json';
//     } else if (selectedCurrency === 'currency1') {
//       dataFile = 'data/gbp_usd.json';
//     } else if (selectedCurrency === 'currency2') {
//       dataFile = 'data/usd_chf.json';
//     } else if (selectedCurrency === 'currency3') {
//       dataFile = 'data/usd_jpy.json';
//     }

//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         updateChart(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving currency data:', error);
//       });
//   });



//   macroDataSelect.addEventListener('change', function() {
//     const selectedMacroData = macroDataSelect.value;
//     let dataFile;


//     if (selectedMacroData === 'macroData0') {
//         dataFile = 'data/cpi.json';
//     } else if (selectedMacroData === 'macroData1') {
//         dataFile = 'data/employment.json';
//     } else if (selectedMacroData === 'macroData2') {
//         dataFile = 'data/fedfunds.json';
//     }
//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         updateChart(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving macro data:', error);
//       });
//   })
// }



























// fetch('data/eur_usd.json')
//   .then(response => response.json())
//   .then(data => {
//     createChart(data);
//   })
//   .catch(error => {
//     console.error('Error retrieving currency data:', error);
//   });

// function createChart(data) {
//   const currencySelect = document.getElementById('currency');
//   const ctx = document.getElementById('myChart').getContext('2d');
//   let myChart = null;

//   function updateChart(data) {
//     const dates = data.observations.map(entry => entry.date);
//     const values = data.observations.map(entry => entry.value);
//     myChart.data.labels = dates;
//     myChart.data.datasets[0].data = values;
//     myChart.update();
//   }

//   myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: data.observations.map(entry => entry.date),
//       datasets: [{
//         label: 'Currency Data',
//         data: data.observations.map(entry => entry.value),
//         color: 'rgb(255, 99, 132)',
//         fill: false
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           type: 'linear',
//           min: 0.0000,
//           max: 1.70000,
//           // suggestedMin: 0.0000,
//           // suggestedMax: 1.70000
//         },
//         x: {
//           type: 'time',
//           min: new Date('1999-01-04').valueOf(),
//           max: new Date('2022-05-08').valueOf(),
//         }
//       },
//       padding: {
//         x: 100,
//         y: 100,
//       },
//       plugins: {
//         decimation: {
//           enabled: true,
//           algorithm: 'lttb',
//         },
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
//               y: 0
//             },
//             rangeMax: {
//               x: null,
//               y: null
//             },
//             speed: .05,
//             threshold: .5,
//             sensitivity: 2,
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

//   currencySelect.addEventListener('change', function() {
//     const selectedCurrency = currencySelect.value;
//     let dataFile;

//     if (selectedCurrency === 'currency0') {
//       dataFile = 'data/eur_usd.json';
//     } else if (selectedCurrency === 'currency1') {
//       dataFile = 'data/gbp_usd.json';
//     } else if (selectedCurrency === 'currency2') {
//       dataFile = 'data/usd_chf.json';
//     } else if (selectedCurrency === 'currency3') {
//       dataFile = 'data/usd_jpy.json';
//     }

//     fetch(dataFile)
//       .then(response => response.json())
//       .then(data => {
//         updateChart(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving currency data:', error);
//       });
//   });
// }






















// function createChart(data) {
//   const currencySelect = document.getElementById('currency');
//   currencySelect.addEventListener('change', function() {
//     const selectedCurrency = currencySelect.value;
//     const dataFile = 'data/gbp_usd.json';
//     // const dataFile = 'data/${currency}.json';

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
//   myChart = new Chart(ctx, { // Assign the created chart to myChart
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
//               y: 2.5 // maximum zoom level
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
