const express = require("express");
const Axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is up and running on ${port}`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/jobs", (req, res) => {
  const URI = `https://jobs.github.com/positions.json?description=${req.body.job}&location=${req.body.location}`;

  Axios.default
    .get(URI)
    .then((result) => res.json(result.data))
    .catch((err) => res.status(400).json(err));
});
