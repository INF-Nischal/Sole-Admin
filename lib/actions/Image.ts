export const getImages = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => data);

    return response.images;
  } catch (error) {
    return error;
  }
};

export const getImageById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`,
      {
        method: "GET",
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

export const uploadImage = async (file: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: file }),
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteImageById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`,
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
