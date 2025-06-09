import { setCardsSlice } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import { TCards } from "@/Types";
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
                if (response.data === 200) {
                    const sortedNewestFirst = response.data.sort((a : TCards, b : TCards) => {
                        if (a.createdAt && b.createdAt){
                            return a.createdAt?.localeCompare(b.createdAt)
                        }
                        return 0
                    });
                    dispatch(setCardsSlice(sortedNewestFirst));   
                }
            } catch (error : any) {
                toast.error(`Failed to fetch cards: ${error}`, {position: `bottom-right`}); 
            }
            
            };

            loadCards();
        }
        
    }, [cards]);

    return {cards, isLoading};
}