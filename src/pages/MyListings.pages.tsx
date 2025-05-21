import { MiniCard } from "@/components/Cards/MiniCard";
import { Hero } from "@/components/Hero";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Box, Center, Flex, Loader, Title } from "@mantine/core";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export function MyCards()  {
    const cards = useSelector((state:RootState) => state.cardSlice.cards);
    const user = useSelector((state:RootState) => state.userSlice.user);
    const [userCards, setUserCards] = useState<TCards[]>([]);
    
    useEffect(() => {
        const loadUserCards = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                
                const response = await axios.get(
                    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards',
                    {headers: {'x-auth-token': token}}
                );

                setUserCards(response.data);
            } catch (error) {
                console.log(error);
            }  
        }

        if (cards && user) {
            setUserCards(cards?.filter((card) => card.user_id === user?._id));
        } else {
            loadUserCards();
        }
    }, [cards, user]);
    
    if (!userCards) {
        return  <>
          <Box pos='relative'>
            <Hero/>
          </Box>
    
          <Center>
            <Loader color="cyan" size="xl" mt={30}/>
          </Center>
        </>      
    }

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