const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const fs = require("fs");
const { CLIENT_RENEG_LIMIT } = require("tls");

const app = express();

const port = 4000;

app.use(express.json());
app.use(morgan("dev"));
//
app.use(cors());

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get("/api/v1/", (req, res) => {
  //
  res.status(200).json({ status: "success", data: JSON.stringify(data) });
});

app.listen(port, () => {
  //
  console.log(`Listening on port ${port}`);
});
