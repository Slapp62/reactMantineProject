import { addLike, removeLike } from "@/store/cardSlice";
import { TCards } from "@/Types";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function useLikeUnlike() {
    const dispatch = useDispatch();

    
    const toggleLike = useCallback(async (card:TCards, userID:string, isLiked:boolean) => {
        
        // update Redux slice
            

        // update API
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                axios.defaults.headers.common["x-auth-token"] = token;
                const response = await axios.patch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                );

                if (isLiked){ 
                    dispatch(removeLike({card : response.data, userID}))
                    toast.warning('Card Unliked!');                
                } else {
                    dispatch(addLike({card : response.data, userID}));
                    toast.success('Card Liked!');
                }
            } catch (error) {
                toast.error(`Error liking/unliking card:${  error}`);
            }
            
            return !isLiked;
    }, [dispatch]);
    
    return toggleLike;
}
