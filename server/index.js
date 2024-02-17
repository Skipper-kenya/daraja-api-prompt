const express = require("express");
const dotenv = require("dotenv");
const { endpoints } = require("./routes/endpoints");
dotenv.config();

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", endpoints);

const port = process.env.port;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
