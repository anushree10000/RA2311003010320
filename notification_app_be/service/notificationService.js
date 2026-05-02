const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  let priority;
  if (type === "urgent") priority = "HIGH";
  else if (type === "warning") priority = "MEDIUM";
  else priority = "LOW";

  
  Log("backend", "info", "service", `Message: ${message}`, "dummy-token")
    .catch(() => {}); 

  
  res.json({
    success: true,
    priority,
    message
  });
};

module.exports = sendNotification;
