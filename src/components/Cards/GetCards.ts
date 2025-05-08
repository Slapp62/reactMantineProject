import { setCardsSlice } from "@/store/cardSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useGetCards() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCards = async () => {
            try {
               const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
                dispatch(setCardsSlice(response.data));  // eslint-disable-next-line no-console        
                console.log(response.data); 
            } catch (error) { // eslint-disable-next-line no-console
                console.error("Failed to fetch cards: ", error); 
            }
            
        };

        loadCards();
    }, []);
}