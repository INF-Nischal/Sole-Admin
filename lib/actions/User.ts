export const login = async (user: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => data);

    return response;
  } catch (error) {
    return error;
  }
};
