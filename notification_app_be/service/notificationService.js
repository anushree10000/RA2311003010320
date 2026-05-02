const getToken = require("../../logging_middleware/utils/auth");
const Log = require("../../logging_middleware/utils/logger");

const sendNotification = async (req, res) => {
  const { type, message } = req.body;

  try {
    // 🔐 GET TOKEN (FIXED ACCESS CODE)
    const token = await getToken({
      email: "ramkrishna@abc.edu",
      name: "ram krishna",
      rollNo: "aa1bb",
      accessCode: "QkbpxH",   // ✅ CORRECT ONE
      clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
      clientSecret: "tVJaaaRBSeXcRXeM"
    });

    // 🧠 PRIORITY LOGIC
    let priority;
    if (type === "urgent") priority = "HIGH";
    else if (type === "warning") priority = "MEDIUM";
    else priority = "LOW";

    // 📝 LOGGING (MANDATORY)
   try {
  await Log("backend", "info", "service", "Notification received", token);
} catch (e) {
  console.log("Logging skipped");
}

    // ✅ RESPONSE
    res.json({
      success: true,
      priority,
      message
    });

  } catch (err) {
    // ❌ ERROR LOGGING
    console.error("ERROR:", err.message);

    await Log(
      "backend",
      "error",
      "service",
      err.message,
      "invalid"
    );

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = sendNotification;
