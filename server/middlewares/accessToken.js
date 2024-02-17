const request = require("request");

const accessToken = (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = new Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    request(
      {
        url,
        headers: {
          Authorization: "Basic " + auth,
        },
      },
      (error, response, body) => {
        if (error) {
          console.log(error.message);
        } else {
          req.access_token = JSON.parse(body).access_token;
          res.send(JSON.parse(body));
          return next();
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = accessToken;
