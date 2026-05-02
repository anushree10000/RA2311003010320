
const getToken = require("../../logging_middleware/utils/auth");
const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
    const token = await getToken({
      email: "your_email",
      name: "your_name",
      rollNo: "your_roll",
      accessCode: "your_access_code",
      clientID: "your_client_id",
      clientSecret: "your_client_secret"
    });

    // Priority logic
    let priority;
    if (type === "urgent") priority = "HIGH";
    else if (type === "warning") priority = "MEDIUM";
    else priority = "LOW";

    await Log("backend", "info", "notification", `Message received: ${message}`, token);

    res.json({
      success: true,
      priority,
      message
    });

  } catch (err) {
    await Log("backend", "error", "notification", err.message, "invalid");

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = sendNotification;
