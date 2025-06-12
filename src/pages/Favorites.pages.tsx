import { Hero } from "@/components/Hero";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core"
import { IconMoodSad } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export function FavoriteCards()  {
    const ListingCard = lazy(() => import('@/components/ListingCard'));
    
    const jumpTo = useNavigate();
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);
    const user = useSelector((state:RootState) => state.userSlice.user);

    const likedCards = allCards?.filter((card) => card.likes?.includes(`${user?._id}`))

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

            <Suspense fallback={<Loader color="cyan" size="xl" mt={30}/>} >
                <Flex wrap="wrap" gap="lg" align='stretch' justify="space-evenly" w="70%" mx='auto'>
                    {likedCards?.map((card:TCards) => (
                    <motion.div
                    key={card._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}>

                    
                        <ListingCard key={card._id} cardID={card._id} />
                

                    </motion.div>
                    ))}
                </Flex>
            </Suspense>
        </Flex>
    )
}