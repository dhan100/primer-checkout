// This example is built using express
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

// Setup Server
const app = express();
const staticDir = path.join(__dirname, 'static');
const checkoutPage = path.join(__dirname, 'static', 'checkout.html');

app.use(bodyParser.json());
app.use('/static', express.static(staticDir));

app.get('/', (req, res) => {return res.sendFile(checkoutPage);});

//    Create a client session 
const PRIMER_API_URLS = { SANDBOX: 'https://api.sandbox.primer.io'}
const API_KEY = process.env.API_KEY;
const PRIMER_API_URL = PRIMER_API_URLS[process.env.PRIMER_API_ENVIRONMENT];

app.post('/client-session', async (req, res) => {
const url = `${PRIMER_API_URL}/client-session`;

const response = await fetch(url, {method: 'post', headers: { 'Content-Type': 'application/json', 'X-Api-Version': '2.2', 'X-Api-Key': API_KEY, },
body: JSON.stringify({
      // Create an orderId for this client session, keep track of it to receive updates through Webhooks.
      orderId: 'order-' + Math.random(),
      currencyCode: 'EUR',
      // emailAddress and billingAddress are required for 3DS
      customer: {
        emailAddress: "iamsekar@gmail.com",
        mobileNumber: "+6597984620",
        firstName: "Dhanasekar",
        lastName: "D",
        billingAddress: {
          firstName: "Dhanasekar",
          lastName: "D",
          postalCode: "560212",
          addressLine1: "Ang Mo Kio Avenue 3",
          countryCode: "SG",
          city: "Berlin",
          state: "Singapore"
        }
      },

      order: {
        // Line items for this session; If your checkout does not have line items: Pass a single line item with the total amount!
        lineItems: [
          {
            itemId: 'Gucci Belt',
            description: 'Gucci Summer Collection',
            amount: 3500,
            quantity: 1,
          },
        ],
     "countryCode":"GB",
      }
      // Check all the other options at https://apiref.primer.io/v2/reference/create_client_side_token_client_session_post
    }),
  }).then(data => data.json());

  return res.send(response);
});

// Run Server
const PORT = process.env.PORT;
console.log(`Checkout server listening`);
app.listen(PORT);