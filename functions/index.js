const functions = require("firebase-functions");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ! Cors - todo
const corsOptions = {
  origin: ["http://localhost:1901", "https://list-less-1796b.web.app", "https://list-less.ca"]
};

// CORs
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("CONNECTED - listless api");
  })
  .catch(err => {
    console.log("CANNOT CONNECT - listless database api", err);
    process.exit();
  });

// ! start:: ROUTES
// * Landing route
app.get("/", (req, res) => {
  res.send("landing - listless server");
});

// todo - OneList
require("./app/routes/one-list/one-list.routes")(app);

// todo -  Auth
// require("./app/routes/auth/auth.routes")(app);
// ! end:: ROUTES

// Set port, listen for requests
const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

exports.app = functions.https.onRequest(app);
