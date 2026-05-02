
const getToken = require("../../logging_middleware/utils/auth");
const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
  const token = await getToken({
  email: "ramkrishna@abc.edu",
  name: "ram krishna",
  rollNo: "aa1bb",
  accessCode: "xgAsNC",
  clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
  clientSecret: "tVJaaaRBSeXcRXeM"
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
