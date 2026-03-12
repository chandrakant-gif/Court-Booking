import { toast } from "react-hot-toast";

const httpAction = async (data) => {
  try {
    const isFormData = data.body instanceof FormData;
   

    const response = await fetch(
      data.url, {
      method: data.method || "GET",
      body: data.body 
      ? (isFormData 
        ? data.body 
        : JSON.stringify(data.body)) 
        : null,
      headers: isFormData
        ? {}
        : { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    throw error;
  }
};

export default httpAction;
