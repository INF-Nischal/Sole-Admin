import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Get all images
export const getImages = async () => {
  try {
    const response = await axios.get(`${baseURL}/images`);
    return response.data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

// Get image by ID
export const getImageById = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/images/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

// Upload new image
export const uploadImage = async (file: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/images`,
      { image: file },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Delete image by ID
export const deleteImageById = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/images/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    return null;
  }
};
