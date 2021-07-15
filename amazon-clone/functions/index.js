const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")('sk_test_51HSpTPFvLsfwmwMOriuKx5Aq10UYJlQxDcMIaOeCCZ1oovE2lw0ov6nOadUPzKsEQAicZTpFK993ExsoYWndt1FN004fM1Bigk')


//API

//API config
const app = express();

//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('hello world'));
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log("payment recieved boom for this amount >>> ", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    //ok-created something
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app);