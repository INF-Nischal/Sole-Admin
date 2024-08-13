export const getAllCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response.categories;
  } catch (error) {
    return error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      { cache: "no-cache" }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response.category;
  } catch (error) {
    return error;
  }
};

export const addCategory = async (category: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};

export const updateCategoryById = async (id: string, category: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};
