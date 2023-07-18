
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
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    const startDate = moment(startDateInput.value, 'MM/DD/YYYY');
    const endDate = moment(endDateInput.value, 'MM/DD/YYYY');

    // Check if start date is empty
    if (!startDate.isValid()) {
      // Set default start date to the first available date
      startDateInput.value = '01/01/1999';
      alert('Invalid start date. Default start date range added.');
      return;
    }

    // Check if end date is empty
    if (!endDate.isValid()) {
      // Set default end date to the last available date
      endDateInput.value = '07/01/2023';
      alert('Invalid end date. Default end date range added.');
      return;
    }

    // Check if start date is before the minimum allowed date
    const minDate = moment('01/01/1999', 'MM/DD/YYYY');
    if (startDate.isBefore(minDate)) {
      startDateInput.value = '01/01/1999';
      alert('Start date cannot be before 01/01/1999. Default start date range added.');
      return;
    }

    // Check if end date is after the maximum allowed date
    const maxDate = moment('07/01/2023', 'MM/DD/YYYY');
    if (endDate.isAfter(maxDate)) {
      endDateInput.value = '07/01/2023';
      alert('End date cannot be after 07/01/2023. Default end date range added.');
      return;
    }

    // Check if start date is after end date
    if (startDate.isAfter(endDate)) {
      startDateInput.value = '01/01/1999';
      endDateInput.value = '07/01/2023';
      alert('Start date cannot be after end date. Default start and end date range added.');
      return;
    }

    // Filter the data based on the selected date range
    const filteredCurrencyData = filterDataByDateRange(updatedCurrencyData, startDate, endDate);
    const filteredMacroData = filterDataByDateRange(updatedMacroData, startDate, endDate);

    // Update the chart with the filtered data
    const currencyDates = filteredCurrencyData.observations.map(entry => entry.date);
    const currencyValues = filteredCurrencyData.observations.map(entry => entry.value);
    const macroDates = filteredMacroData.observations.map(entry => entry.date);
    const macroValues = filteredMacroData.observations.map(entry => entry.value);

    myChart.data.labels = currencyDates;
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
          scaleLabel: {
            display: true,
            labelString: 'Exchange Rate'
          },
          ticks: {
            callback: function(value, index, values) { return value.toFixed(3)}
          }
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

  function filterDataByDateRange(data, startDate, endDate) {
    const observations = data.observations.filter(entry => {
      const date = new Date(entry.date);
      return date >= startDate && date <= endDate;
    });

    return {
      ...data,
      observations
    };
  }

  const dateRangeButton = document.getElementById('dateRangeButton');
  const startDateInput = document.getElementById('startDateInput');
  const endDateInput = document.getElementById('endDateInput');

  dateRangeButton.addEventListener('click', function() {
    // Get the selected start and end dates from the date picker inputs
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Update the chart with the selected date range
    updateChart(currencyData, macroData, startDate, endDate);
  });

  currencySelect.addEventListener('change', function() {
    const selectedCurrency = currencySelect.value;
    let dataFile;

    if (selectedCurrency === 'currency0') {
      dataFile = 'data/eur_usd_m.json';
    } else if (selectedCurrency === 'currency1') {
      dataFile = 'data/usd_jpy_m.json';
    // } else if (selectedCurrency === 'currency2') {
    //   dataFile = 'data/usd_chff.json';
    } else if (selectedCurrency === 'currency3') {
      dataFile = 'data/gbp_usdd.json';
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
    //   dataFile = 'data/balancesheet.json';
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
