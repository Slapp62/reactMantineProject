import { Hero } from "@/components/Hero";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { IconCards, IconMoodSad } from "@tabler/icons-react";
import axios from "axios";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function MyCards()  {
    const MiniCard = lazy(() => import('@/components/Cards/MiniCard'));
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);
    const user = useSelector((state:RootState) => state.userSlice.user);
    const [userCards, setUserCards] = useState<TCards[]>([]);
    const jumpTo = useNavigate();
    
    useEffect(() => {
        const loadUserCards = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get(
                    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards',
                    {headers: {'x-auth-token': token}}
                );
                setUserCards(response.data);
            } catch (error : any) {
                toast.error(error);
            }  
        }

        // check if cards are already available in Redux
        if (allCards && user) {
            setUserCards(allCards?.filter((card) => card.user_id === user?._id));
        } 
        // if they aren't, fetch from API
        else {
            loadUserCards();
        }
    }, [allCards, user]);
    
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

    if (userCards.length === 0) {
        return (
            <Flex mt={20} direction='column' align='center' gap={20}>
                <Box mt={20}><IconMoodSad color="gray" size={100}/></Box>
                <Title my={10} c='gray'>No Listings Found</Title>
                
                <Button onClick={() => jumpTo('/create-card')} variant='filled' color='blue' size='lg' fz={20}>     
                    Create A Listing
                </Button>
            </Flex>
        )
    }

    return (
        <Flex mt={20} direction='column' align='center' gap={20}>
            
            <Title>My Listings</Title>

            <Button 
            component={Link}
            to='/create-card'  
            mx='auto' variant='outline' 
            color='green' 
            size='md' 
            fz={20}
            rightSection={<IconCards/>}
            >     
            Create A New Listing
            </Button>

            <Suspense fallback={<Loader color="cyan" size="xl" mt={30}/>} >
                <Flex wrap="wrap" gap="lg" align='stretch' justify="space-evenly" w="70%" mx='auto'>
                    {userCards && userCards.map((card:TCards) => (
                    <motion.div
                    key={card._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}>

                    
                        <MiniCard key={card._id} cardID={card._id} />
                

                    </motion.div>
                    ))}
                </Flex>
            </Suspense>
        </Flex>
    )
}