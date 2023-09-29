const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://integration.api.scalapay.com/v1/reporting/orders?size=5000&page=0',
  headers: {accept: 'application/json', Authorization: 'Bearer qhtfs87hjnc12kkos'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });