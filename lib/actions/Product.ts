import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getTimeframeProduct = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/products/analytics?time=${query}`,
      {
        headers: {
          "Cache-Control": "no-store", // Custom cache handling if needed
        },
      }
    );

    return response.data.products;
  } catch (error) {
    return [];
  }
};

// Get all products
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`, {
      headers: {
        "Cache-Control": "no-store", // Custom cache handling if needed
      },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/products/${id}`, {
      headers: {
        "Cache-Control": "no-store", // Custom cache handling if needed
      },
    });
    return response.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Update product by ID
export const updateProductById = async (id: string, values: any) => {
  try {
    const response = await axios.put(`${baseURL}/products/${id}`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

// Delete product by ID
export const deleteProductById = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};

// Add new product
export const addProduct = async (product: any) => {
  try {
    const response = await axios.post(`${baseURL}/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};
