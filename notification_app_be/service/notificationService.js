const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  // Priority logic
  let priority;
  if (type === "urgent") priority = "HIGH";
  else if (type === "warning") priority = "MEDIUM";
  else priority = "LOW";

  // ❗ DO NOT await this
  Log("backend", "info", "service", `Message: ${message}`, "dummy-token")
    .catch(() => {}); // ignore failure

  // Always respond success
  res.json({
    success: true,
    priority,
    message
  });
};

module.exports = sendNotification;
