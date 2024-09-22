import axios from "axios";

const fetchData = async (endpoint: string, language: 'ar' | 'en' = 'en') => {
  const config = {
    headers: {
      "Accept-Language": language,
    },
  };
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`, config);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] }; // Return empty data to prevent breaking the page
  }
};

export default fetchData;
