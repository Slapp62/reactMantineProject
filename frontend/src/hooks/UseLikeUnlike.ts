import { addFavorite, removeFavorite } from "@/store/listingSlice";
import { TJobListing } from "@/Types";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function useLikeUnlike() {
    const dispatch = useDispatch();

    
    const toggleLike = useCallback(async (listing: TJobListing, userID: string, isLiked: boolean) => {
        
        // update Redux slice
            

        // update API
            try {
                const response = await axios.patch(
                    `https://localhost:5000/listings/${listing._id}/toggleLike`,
                );

                if (isLiked){ 
                    dispatch(removeFavorite({listings : response.data, userID}))
                    toast.warning('Listing Unliked!');                
                } else {
                    dispatch(addFavorite({listings : response.data, userID}));
                    toast.success('Listing Liked!');
                }
            } catch (error) {
                toast.error(`Error liking/unliking Listing:${  error}`);
            }
            
            return !isLiked;
    }, [dispatch]);
    
    return toggleLike;
}
