const express = require("express");
const cors = require("cors");
const router = require("./routing/routing_events");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = 4040;
require("./databaseC");

app.use("/", router);

app.listen(port, () => {
  console.log("server running on port number 4040");
});
