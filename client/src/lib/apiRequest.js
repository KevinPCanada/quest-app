// 1. Determine the base URL automatically
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:8800/api"
  : "/api";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    // 2. Configure the options
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Always send cookies
    };

    // 3. If we have data to send, add it to the body
    if (body) {
      options.body = JSON.stringify(body);
    }

    // 4. Make the request
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // 5. Global Error Handler
 if (!response.ok) {
      // 1. Try to parse as JSON first
      const errorData = await response.json().catch(() => null);
      
      // 2. If it's not JSON, try to get plain text
      const errorMessage = errorData?.message || errorData || await response.text();
      
      console.error("Server Error Details:", errorMessage); // <--- LOGS TO CONSOLE
      
      throw new Error(errorMessage || `API Error: ${response.status}`);
    }

    // 6. Return the data
    return await response.json();
    
  } catch (err) {
    console.error(`Request failed: ${endpoint}`, err);
    throw err;
  }
};