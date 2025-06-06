import { setCardsSlice } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useGetCards() {
    const dispatch = useDispatch();
    const cards = useSelector((state:RootState) => state.cardSlice.cards);
    const isLoading = cards === null;

    useEffect(() => {
        if (cards !== null) {
            //cards are already loaded in Redux
        } else {
            const loadCards = async () => {
            try {
                const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
                dispatch(setCardsSlice(response.data));   
            } catch (error : any) {
                toast.error(`Failed to fetch cards: ${error}`, {position: `bottom-right`}); 
            }
            
            };

            loadCards();
        }
        
    }, [cards]);

    return {cards, isLoading};
}