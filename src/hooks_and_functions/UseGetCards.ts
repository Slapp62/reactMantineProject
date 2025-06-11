import { setCardsSlice } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import { TCards } from "@/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useGetCards() {
    const dispatch = useDispatch();
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (allCards === null) {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
                    //const sortedNewestFirst : TCards[] = response.data;
                    dispatch(setCardsSlice(response.data));   
                } catch (error : any) {
                    toast.error(`Failed to fetch cards: ${error}`, {position: `bottom-right`}); 
                } finally {
                    setIsLoading(false);
                }
            })();
        }
        
    }, [allCards, dispatch]);

    return {allCards, isLoading, setIsLoading};
}