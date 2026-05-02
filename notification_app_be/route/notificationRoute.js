
const express = require("express");
const router = express.Router();

const sendNotification = require("../service/notificationService");

router.post("/send", sendNotification);

module.exports = router;
