const axios = require("axios");

const AUTH_API = "http://20.207.122.201/evaluation-service/auth";

async function getToken(body) {
  const res = await axios.post(AUTH_API, body);
  return res.data.access_token;
}

module.exports = getToken;
