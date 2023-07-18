const exchangeRates = {}; 

const fetchCurrencyData = async (baseCurrency, targetCurrency) => {
  const apiKey = 'fca_live_DD34PLu7ukRXMyBGqp4zbJ27JQeKNiIi4kSDHUTt';
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${targetCurrency}&base_currency=${baseCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data[targetCurrency];
  } catch (error) {
    console.error('Error fetching currency data:', error);
    throw error;
  }
};

const getExchangeRate = async (baseCurrency, targetCurrency) => {
  const currencyPair = `${baseCurrency}_${targetCurrency}`;

  // Check if the exchange rate is already cached
  if (exchangeRates[currencyPair]) {
    return exchangeRates[currencyPair];
  }

  try {
    const exchangeRate = await fetchCurrencyData(baseCurrency, targetCurrency);

    // Cache the exchange rate for future use
    exchangeRates[currencyPair] = exchangeRate;

    return exchangeRate;
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    throw error;
  }
};

const convertCurrency = async () => {
  const currencySelect = document.getElementById('currency');
  const selectedCurrency = currencySelect.value;
  const inputAmount = document.getElementById('inputAmount').value;
  const resultElement = document.getElementById('result');

  let baseCurrency, targetCurrency;
  switch (selectedCurrency) {
    case 'currency0': // EUR/USD
      baseCurrency = 'EUR';
      targetCurrency = 'USD';
      break;
    case 'currency1': // USD/JPY
      baseCurrency = 'USD';
      targetCurrency = 'JPY';
      break;
    case 'currency3': // GBP/USD
      baseCurrency = 'GBP';
      targetCurrency = 'USD';
      break;
    default:
      console.error('Invalid currency pair:', selectedCurrency);
      return;
  }

  try {
    const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);
    const convertedAmount = inputAmount * exchangeRate;
    resultElement.textContent = `${inputAmount} ${baseCurrency} = ${convertedAmount.toFixed(4)} ${targetCurrency}`;
  } catch (error) {
    console.error('Error converting currency:', error);
    resultElement.textContent = 'Error converting currency';
  }


};
