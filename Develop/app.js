const express = require("express");
const path = require("path");
const app = express();

const noteText = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const util = require("util");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("/api/notes", (req, res) => res.json(noteText));

app.post("/notes", async (req, res) => {
  const { title, text } = req.body
  const noteText = await readFromFile("./db/db.json");

  const data = JSON.parse(noteText);
  data.push({ title, text, note_id: uuidv4() })

  writeToFile("../db/db.json", data);
  res.send("Success");
});

app.use(express.static("public"));

const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);