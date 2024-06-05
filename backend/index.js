const express = require("express");
const config = require("./config.js");
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoutes.js");
const cors = require("cors");

const PORT = config.PORT;
const uri = config.uri;

const app = express();

// middleware to handle body data for postman
app.use(express.json());

// Middleware for handling CORS POLICY

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/books", bookRoute);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection Successful");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
