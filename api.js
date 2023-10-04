const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const fs = require("fs");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
//
app.use(cors());

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
