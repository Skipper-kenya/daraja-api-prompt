const express = require("express");
const accessToken = require("../middlewares/accessToken");
const { format } = require("date-fns");
const request = require("request");

const router = express.Router();

router.post("/daraja/stkpush", accessToken, async (req, res) => {
  const { amount, phone } = req.body;
  const token = req.access_token;
  try {
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + token;
    const timestamp = format(new Date(), "yyyyMMddHHmmss");
    const password = new Buffer.from(
      process.env.short_code + process.env.passkey + timestamp
    ).toString("base64");

    request(
      {
        url,
        method: "POST",
        headers: { Authorization: auth },
        json: {
          BusinessShortCode: process.env.short_code,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: `254${phone}`,
          PartyB: "174379",
          PhoneNumber: `254${phone}`,
          CallBackURL: "https://mydomain.com/pat",
          AccountReference: "Andrew Kimwetich",
          TransactionDesc: "test",
        },
      },
      (err, response, body) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(body);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports.endpoints = router;
