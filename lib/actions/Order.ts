import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getTimeframeOrder = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/orders/analytics?time=${query}`,
      {
        headers: {
          "Cache-Control": "no-store", // Custom cache handling if needed
        },
      }
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${baseURL}/orders`);
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Get order by ID
export const getOrderById = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/orders/${id}`);
    return response.data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

// Update order by ID
export const updateOrderById = async (id: string, values: any) => {
  try {
    const response = await axios.put(
      `${baseURL}/orders/${id}`,
      { deliveryStatusMessage: values.orderDeliveryStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};
