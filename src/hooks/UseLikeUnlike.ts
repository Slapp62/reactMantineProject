/* eslint-disable no-console */
import { addLike, removeLike } from "@/store/cardSlice";
import { RootState } from "@/store/store";
import { TCards } from "@/Types";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useLikeUnlike() {
    const dispatch = useDispatch();

    const user = useSelector((state:RootState) => state.userSlice.user);
    const globalCards = useSelector((state: RootState) => state.cardSlice.cards);

    const toggleLike = useCallback(async (card:TCards) => {
        //get current liked state
        const thisGlobalCard = globalCards?.find((globalCard) => globalCard._id === card._id);
        const isLiked = thisGlobalCard?.likes?.includes(`${user?._id}`)
        console.log(user?._id);
        
        console.log(thisGlobalCard?.likes);
        

        // update Redux slice
            if (isLiked){ 
                dispatch(removeLike({card, userID:user!._id!}))
                toast.warning('Card Unliked!', {position: 'bottom-right'});
                console.log('dispatched new unlike');
                
            } else {
                dispatch(addLike({card, userID:user!._id!}));
                toast.success('Card Liked!', {position: 'bottom-right'});
                console.log('dispatched new like');
            }

        // update API
        
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                axios.defaults.headers.common["x-auth-token"] = token;
                await axios.patch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                );
                console.log('dispatched new api like/unlike');

            } catch (error) {
                toast.error(`Error liking/unliking card:${  error}`);
            }

            console.log(!isLiked);
            return !isLiked;
    }, [dispatch, user, globalCards]);
    
    return toggleLike;
}