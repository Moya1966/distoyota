var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createLeadSalesforce', async (req, res) => {
  const { leadData } = req.body;

  try {
      // Obtener el token de autenticación
      const authResponse = await axios.post('https://test.salesforce.com/services/oauth2/token', null, {
          params: {
              grant_type: 'password',
              client_id: '3MVG9oZtFCVWuSwNbU9py_ihvJiNbAieug5rRspqxNhMnymDpOX3QNMbPVhMx34Nh6bejWVd9az3sPjQ8g2Xt',
              client_secret: 'D1500A77493F38B10C6742FD550ED997770A8CC6C68D6387BC44CFE6A4874C95',
              username: 'integration@toyota.com.dev',
              password: 'Freeway2022!4FCg3sNxUoQYk9stJJUx4b51Q'
          }
      });

      const accessToken = authResponse.data.access_token;
      const instanceUrl = authResponse.data.instance_url;

      // Crear el lead en Salesforce usando el token y el instance_url
      const leadResponse = await axios.post(
          `${instanceUrl}/services/data/v56.0/sobjects/Lead`,
          leadData,
          {
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      res.json(leadResponse.data);
  } catch (error) {
      res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

module.exports = router;
