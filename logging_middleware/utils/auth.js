const axios = require("axios");

const AUTH_API = "http://20.207.122.201/evaluation-service/auth";

async function getToken(body) {
  try {
    const res = await axios.post(AUTH_API, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res.data.access_token;
  } catch (err) {
    console.error("AUTH ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = getToken;
