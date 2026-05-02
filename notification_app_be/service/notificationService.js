const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
    // ✅ NO AUTH
    const token = "dummy-token";

    // Priority logic
    let priority;
    if (type === "urgent") priority = "HIGH";
    else if (type === "warning") priority = "MEDIUM";
    else priority = "LOW";

    // ✅ SAFE LOGGING (WILL NEVER BREAK API)
    Log("backend", "info", "service", `Message: ${message}`, token)
      .catch(() => console.log("Logging skipped"));

    // ✅ RESPONSE ALWAYS SUCCESS
    res.json({
      success: true,
      priority,
      message
    });

  } catch (err) {
    console.error("ERROR:", err.message);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = sendNotification;
