import { API_BASE_URL } from "@/config/api";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./tokenManager";

const fetchBusinessListings = async (userId: string | undefined) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/api/listings/${userId}`, {
        headers: { authorization: token },
      });

      console.log('business listings fetched successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error);
    }
  };

export default fetchBusinessListings