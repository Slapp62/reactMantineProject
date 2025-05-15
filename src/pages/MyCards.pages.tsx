import { MiniCard } from "@/components/Cards/MiniCard";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Flex, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useSelector } from "react-redux"

export function MyCards()  {
    const cards = useSelector((state:RootState) => state.cardSlice.cards);
    const user = useSelector((state:RootState) => state.userSlice.user);


    const userCards = cards?.filter((card) => card.user_id === user?._id);
    
    return (
        <Flex mt={20} direction='column' align='center' gap={20}>
            
            <Title>My Listings</Title>

            <Flex wrap="wrap" gap="lg" align='stretch' justify="space-evenly" w="70%" mx='auto'>
                {userCards && userCards.map((card:TCards) => (
                <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}>

                <MiniCard key={card._id} card={card} />

                </motion.div>
                ))}
            </Flex>
        </Flex>
    )
}