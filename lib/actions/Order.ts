export const getAllOrders = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => data);

    return response.orders;
  } catch (error) {
    return error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      { cache: "no-cache" }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response.order;
  } catch (error) {
    return error;
  }
};

export const updateOrderById = async (id: string, values: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryStatusMessage: values.orderDeliveryStatus,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};
