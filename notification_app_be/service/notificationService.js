const getToken = require("../../logging_middleware/utils/auth");
const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
    // ✅ REAL AUTH (your details)
    const token = await getToken({
      email: "ad8150@srmist.edu.in",
      name: "anushree dixit",
      rollNo: "RA2311003010320",
      accessCode: "QkbpxH",
      clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
      clientSecret: "tVJaaaRBSeXcRXeM"
    });

    // 🎯 Priority logic
    let priority;
    if (type === "urgent") priority = "HIGH";
    else if (type === "warning") priority = "MEDIUM";
    else priority = "LOW";

    // ✅ SAFE LOGGING (won’t break API even if it fails)
    try {
      await Log(
        "backend",
        "info",
        "service",
        `Notification: ${message}`,
        token
      );
    } catch (e) {
      console.log("Logging failed but continuing");
    }

    // ✅ RESPONSE
    res.json({
      success: true,
      priority,
      message
    });

  } catch (err) {
    console.error("AUTH ERROR:", err.message);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = sendNotification;
