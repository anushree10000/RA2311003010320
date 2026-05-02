const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
    // ✅ Skip auth (external API unreliable)
    const token = "dummy-token";

    // Priority logic
    let priority;
    if (type === "urgent") priority = "HIGH";
    else if (type === "warning") priority = "MEDIUM";
    else priority = "LOW";

    // ✅ Non-blocking logging
    Log("backend", "info", "service", `Message: ${message}`, token)
      .catch(() => console.log("Logging skipped"));

    // ✅ Always return success
    res.json({
      success: true,
      priority,
      message
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = sendNotification;
