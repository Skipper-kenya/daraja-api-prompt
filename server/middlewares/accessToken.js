const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const accessToken = async (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = new Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    request(
      {
        url: url,
        headers: {
          Authorization: "Basic " + auth,
        },
      },
      (error, response, body) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(body);
          req.access_token = JSON.parse(body).access_token;
          res.send(JSON.parse(body).access_token);
          next();
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = accessToken;
