import { Card, Image, Text, Button, Flex, ListItem, List, Box, Group, Modal} from '@mantine/core';
import { TCards } from '@/Types';
import {IconEdit, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteCard } from '@/hooks/UseDeleteCard';
import { FavoritesButton } from '../Buttons/AddToFavorites';
import { useDisclosure } from '@mantine/hooks';
import translateCard from '../TranslateCard';
import { useState } from 'react';
import { BsTranslate } from 'react-icons/bs';

export function MiniCard({ card } : { card: TCards }) {
    const [opened, { open, close }] = useDisclosure(false);

    const deleteCard = useDeleteCard();
    const jumpTo = useNavigate();
    const location = useLocation();
    const myListingsPage = location.pathname === '/my-listings';
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
    
    const [translatedText, setTranslatedText] = useState<string[] | null>(null);
    const cardString = `${card.title} \n ${card.subtitle} \n ${card.description}`
    const containsHebrew = RegExp(/[\u0590-\u05FF]/).test(cardString);
    
    const handleTranslate = async (cardString: string) => {
        const cardStringArr = cardString.split(' \n ');
        const aiOutput = await translateCard(cardStringArr);                
        setTranslatedText(aiOutput);
    }
    

  return (
    <>
        <Card h='100%' shadow="sm" mx={-15} radius="md" w={300} withBorder>
        <Card.Section>
            <Image
            src={card.image.url}
            height={160}
            alt="picture"
            fit='cover'
            loading='lazy'
            fallbackSrc='https://www.irisoele.com/img/noimage.png'
            />
        
        </Card.Section> 

        <Card.Section px={15}>
            <Text my="xs" fw={500}>{translatedText ? translatedText[0] : card.title} </Text>
        
            <Box>
            <Text truncate w={250}>
                <Text>{translatedText ? translatedText[1] : card.subtitle}</Text>
            </Text>
            <hr/>
                {translatedText ? translatedText[2] : card.description} 
            
            <List>
                <ListItem>{card.phone}</ListItem>
                <ListItem>{card.email}</ListItem>
            </List>
            </Box>

            <Flex mx="auto" mt={10} gap={10} direction='column'>
            <Button variant='outline' fz={12} onClick={() => jumpTo(`/card-details/${card._id}`)}>
                <Text fw='bold'>More Info</Text>
            </Button>

            {containsHebrew &&    
            <Button rightSection={<BsTranslate/>} variant='outline' fz={12} onClick={() => handleTranslate(cardString)}>
                <Text fw='bold'>Translate</Text>
            </Button>}

            {loggedIn && myListingsPage && 
            <Button onClick={() => jumpTo(`/edit-card/${card._id}`)}>
                <IconEdit/>
            </Button>}

            {myListingsPage && 
                <Button bg='red' onClick={open}>
                <IconTrash />
                </Button>}
            </Flex>

            <Group my={10} justify='center' >
            {loggedIn && <FavoritesButton card={card} />}
            </Group>
    
        </Card.Section>
        </Card>

        <Modal centered opened={opened} onClose={close} title="Confirmation">
            <Text>Are you sure you want to delete this card?</Text>
            <Group mt={20} justify="center">
                <Button color="red" onClick={() => {
                    deleteCard(card);
                    close();
                }}>
                Yes, Delete It</Button>
                <Button variant="outline" onClick={close}>No, Take Me Back</Button>
            </Group>
        </Modal>
    </>
  );
}