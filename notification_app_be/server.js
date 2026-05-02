const express = require("express");
const notificationRoute = require("./route/notificationRoute");

const app = express();
app.use(express.json());

app.use("/notifications", notificationRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
