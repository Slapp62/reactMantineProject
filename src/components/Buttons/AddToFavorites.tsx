import { Button } from "@mantine/core";
import { useLikeUnlike } from '@/hooks_and_functions/UseLikeUnlike';
import { RootState } from "@/store/store";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { TCards } from "@/Types";


export function FavoritesButton({ card } : { card: TCards }) {
    const toggleLike = useLikeUnlike(); 
    
    const heartOutline = <IconHeart />;
    const heartFilled = <IconHeartFilled/>;
    const user = useSelector((state: RootState) => state.userSlice.user);
    
    const globalCards = useSelector((state: RootState) => state.cardSlice.cards);
    const thisGlobalCard = globalCards?.find((globalCard) => globalCard._id === card._id);
    const isLiked = thisGlobalCard?.likes?.includes(`${user?._id}`)

    return (
        <Button radius="xl" variant='outline' color="purple" onClick={() => toggleLike(card)}>
            {isLiked ? heartFilled : heartOutline}
        </Button>
    )
}