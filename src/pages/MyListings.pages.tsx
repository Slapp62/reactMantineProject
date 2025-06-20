import { Hero } from "@/components/Hero";
import MappedCards from "@/components/MappedCards";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { IconCards, IconMoodSad } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function MyCards()  {
    
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
            setUserCards(allCards?.filter((card:TCards) => card.user_id === user?._id));
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

            <MappedCards cardsArr={userCards}/>
        </Flex>
    )
}