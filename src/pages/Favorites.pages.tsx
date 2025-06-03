import { MiniCard } from "@/components/Cards/MiniCard"
import { Hero } from "@/components/Hero";
import { useGetCards } from "@/hooks/UseGetCards";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core"
import { IconMoodSad } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export function FavoriteCards()  {
    const jumpTo = useNavigate();
    const {cards, isLoading} = useGetCards();
    const user = useSelector((state:RootState) => state.userSlice.user);

    const likedCards = cards?.filter((card) => card.likes?.includes(`${user?._id}`))

    if (isLoading) {
        return <>
          <Box pos='relative'>
            <Hero/>
          </Box>
    
          <Center>
            <Loader color="cyan" size="xl" mt={30}/>
          </Center>
        </>      
    }

    if (likedCards?.length === 0) {
        return (
            <Flex mt={20} direction='column' align='center' gap={20}>
                <Box mt={20}><IconMoodSad color="gray" size={100}/></Box>
                <Title my={10} c='gray'>No Favorites Found</Title>
                
                <Button onClick={() => jumpTo('/')} variant='filled' color='blue' size='lg' fz={20}>     
                    Find Some Favorites
                </Button>
            </Flex>
        )
    }

    return (
        <Flex m={20} direction='column' align='center' gap={20}>
            <Title>Favorites</Title>

            <Flex wrap="wrap"  gap={20} align='stretch' justify="space-evenly" w="80%" mx='auto'>
                {likedCards?.map((card:TCards) => (
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