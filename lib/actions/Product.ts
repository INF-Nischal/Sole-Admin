export const getAllProduct = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response.products;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());

    return response.product;
  } catch (error) {
    return error;
  }
};

export const updateProductById = async (id: string, values: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      }
    ).then((res) => res.json());

    console.log(response);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => res.json());

    return response;
  } catch (error) {
    return error;
  }
};

export const addProduct = async (product: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};
