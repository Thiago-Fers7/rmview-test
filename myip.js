const axios = require('axios');

axios.get('https://api.ipify.org?format=json')
  .then(response => {
    console.log('Meu IP público é:', response.data.ip);
  });