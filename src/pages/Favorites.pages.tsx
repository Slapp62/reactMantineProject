import { BizCard } from "@/components/Cards/MiniCard"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export function FavoriteCards()  {
    const likedCards = useSelector((state: RootState) => state.user.likedCards)

    return (
        likedCards.map((card, index) => {
            return <BizCard key={index} card={card}/>
        }) 
    )
}