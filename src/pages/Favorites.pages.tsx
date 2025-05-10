import { MiniCard } from "@/components/Cards/MiniCard"
import { RootState } from "@/store/store"
import { Flex } from "@mantine/core"
import { useSelector } from "react-redux"

export function FavoriteCards()  {
    const favorites = useSelector((state: RootState) => state.cardSlice.favoriteCards)
    console.log(favorites);

    return (
        <Flex>
            {favorites?.map((card) => {
                return <MiniCard key={card._id} card={card}/>
            })}
        </Flex>
        
    )
}