const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const fs = require("fs");

const app = express();

const port = 4000;

// custom variables
let filteredArray = [];

const jobFinder = () => {
  //
  if (filter.length === 1) {
    // console.log("keyWordArray", keyWordArray);
    console.log("FILTERING 1");
    filteredArray = jobs.filter(
      (job) =>
        job.position.toLowerCase().search(filter[0].toLowerCase()) != -1 ||
        job.location.toLowerCase().search(filter[0].toLowerCase()) != -1 ||
        job.languages.join("").toLowerCase().search(filter[0].toLowerCase()) !=
          -1 ||
        job?.tools.join("").toLowerCase().search(filter[0].toLowerCase()) != -1
    );
  } else if (filter.length > 1) {
    console.log("FILTERING > 1");

    filter.forEach((word) => {
      filteredArray = jobs.filter(
        (job) =>
          job.position.toLowerCase().search(word.toLowerCase()) != -1 ||
          job.location.toLowerCase().search(word.toLowerCase()) != -1 ||
          job.languages.join("").toLowerCase().search(word.toLowerCase()) !=
            -1 ||
          job?.tools.join("").toLowerCase().search(word.toLowerCase()) != -1
      );
    });
  }
};

app.use(express.json());
app.use(morgan("dev"));
//
app.use(cors());

const jobs = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
// const filter = JSON.parse(fs.readFileSync(`${__dirname}/filter.json`));
const filter = [];

app.get("/api/v1/", (req, res) => {
  //
  res.status(200).json({ status: "success", data: jobs });
});
//
app.get("/api/v1/:filter", (req, res) => {
  // filter.push(req.params.filter);

  let keyWordArray = [];
  let filteredArray = [];

  if (req.params.filter.search(/-/g) > 0)
    keyWordArray = req.params.filter.split("-");
  else keyWordArray.push(req.params.filter);

  if (keyWordArray.length === 1) {
    //
    filteredArray = jobs.filter(
      (job) =>
        job.position.toLowerCase().search(keyWordArray[0].toLowerCase()) !=
          -1 ||
        job.location.toLowerCase().search(keyWordArray[0].toLowerCase()) !=
          -1 ||
        job.languages
          .join("")
          .toLowerCase()
          .search(keyWordArray[0].toLowerCase()) != -1 ||
        job?.tools
          .join("")
          .toLowerCase()
          .search(keyWordArray[0].toLowerCase()) != -1
    );
  } else if (keyWordArray.length > 1) {
    //
    keyWordArray.forEach((word, index) => {
      filteredArray =
        index === 0
          ? jobs.filter(
              (job) =>
                job.position.toLowerCase().search(word.toLowerCase()) != -1 ||
                job.location.toLowerCase().search(word.toLowerCase()) != -1 ||
                job.languages
                  .join("")
                  .toLowerCase()
                  .search(word.toLowerCase()) != -1 ||
                job?.tools.join("").toLowerCase().search(word.toLowerCase()) !=
                  -1
            )
          : filteredArray.filter(
              (job) =>
                job.position.toLowerCase().search(word.toLowerCase()) != -1 ||
                job.location.toLowerCase().search(word.toLowerCase()) != -1 ||
                job.languages
                  .join("")
                  .toLowerCase()
                  .search(word.toLowerCase()) != -1 ||
                job?.tools.join("").toLowerCase().search(word.toLowerCase()) !=
                  -1
            );
    });
  }

  console.log("filteredArray", filteredArray);

  res.status(200).json({ status: "success", data: filteredArray });
});
//
app.listen(port, () => {
  //
  console.log(`Listening on port ${port}`);
});
