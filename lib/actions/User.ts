import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getTimeframeUser = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/users/analytics?time=${query}`,
      {
        headers: {
          "Cache-Control": "no-store", // Custom cache handling if needed
        },
      }
    );

    return response.data.users;
  } catch (error) {
    return [];
  }
};

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
