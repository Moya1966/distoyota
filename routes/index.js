var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/authenticateSalesforce', async (req, res) => {
  try {
      const response = await axios.post('https://test.salesforce.com/services/oauth2/token', null, {
          params: {
              grant_type: 'password',
              client_id: '3MVG9oZtFCVWuSwNbU9py_ihvJiNbAieug5rRspqxNhMnymDpOX3QNMbPVhMx34Nh6bejWVd9az3sPjQ8g2Xt',
              client_secret: 'D1500A77493F38B10C6742FD550ED997770A8CC6C68D6387BC44CFE6A4874C95',
              username: 'integration@toyota.com.dev',
              password: 'Freeway2022!4FCg3sNxUoQYk9stJJUx4b51Q'
          }
      });

      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

router.post('/createLeadSalesforce', async (req, res) => {
  const { accessToken, leadData } = req.body;
  try {
      const response = await axios.post(
          'https://kumo-toyota--kumodev.sandbox.my.salesforce.com/services/data/v56.0/sobjects/Lead',
          leadData,
          {
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

module.exports = router;
