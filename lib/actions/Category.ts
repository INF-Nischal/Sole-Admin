import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getTimeframeCategories = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/categories/analytics?time=${query}`,
      {
        headers: {
          "Cache-Control": "no-store", // Custom cache handling if needed
        },
      }
    );

    return response.data.categories;
  } catch (error) {
    return [];
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/categories`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/categories/${id}`);
    return response.data.category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

// Add new category
export const addCategory = async (category: any) => {
  try {
    const response = await axios.post(`${baseURL}/categories`, category, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

// Update category by ID
export const updateCategoryById = async (id: string, category: any) => {
  try {
    const response = await axios.put(`${baseURL}/categories/${id}`, category, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

// Delete category by ID
export const deleteCategoryById = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
};
