// src/services/apiConnector.js
import axios from "axios";

// apiConnector function
const apiConnector = async (method, url, body = null, headers = null, params = null) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers,
      params, // query params
    });
    return response;
  } catch (error) {
    console.error("API Connector Error:", error);
    throw error;
  }
};

export default apiConnector;
