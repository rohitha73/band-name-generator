import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGen(req, res, next) {
  console.log(req.body);
  const bandName = req.body["street"] + req.body["pet"];
  req.bandName = bandName;
  next();
}

app.use(bandNameGen);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send("Band Name: " + req.bandName);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
