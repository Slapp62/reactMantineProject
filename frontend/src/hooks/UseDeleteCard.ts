import { removeCard } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import { TCards } from "@/Types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useDeleteCard() {
    const dispatch = useDispatch();
    const globalCards = useSelector((state:RootState) => state.cardSlice.cards)

    const deleteCard = async (card:TCards) => {
        // update API
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, 
                {
                    headers: {
                        'x-auth-token': token
                    },
                    data: {
                        bizNumber: card.bizNumber
                    }
                }
            )
            if (response.status === 200){
                // update Redux
                const thisCard = globalCards?.find((globalCard) => globalCard._id === card._id )
                dispatch(removeCard(thisCard!))
                toast.success(`Card deleted successfully`, {position: 'bottom-right'});
            }

        } catch (error:any){ 
            toast.error(`Error deleting card: ${error}`, {position: 'bottom-right'});
        }
    }

    return deleteCard;
}