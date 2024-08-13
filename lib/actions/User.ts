import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Login
export const login = async (user: any) => {
  try {
    const response = await axios.post(`${baseURL}/signin`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
