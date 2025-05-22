import { Card, Image, Text, Button, Flex, ListItem, List, Box, Group} from '@mantine/core';
import { TCards } from '@/Types';
import {IconBrandWhatsapp, IconEdit, IconShare, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDeleteCard } from '@/hooks/UseDeleteCard';
import { FavoritesButton } from '../Buttons/AddToFavorites';

export function MiniCard({ card } : { card: TCards }) {
  
  
  const deleteCard = useDeleteCard();
  const jumpTo = useNavigate();
  const location = useLocation();
  const myListingsPage = location.pathname === '/my-listings';

  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);

  return (
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
        <Text my="xs" fw={500}>{card.title}</Text>
      
        <Box>
          <Text truncate w={250}>{card.description}</Text>
          <hr/>
          <Text>{card.subtitle}</Text>
          <List>
            <ListItem>{card.phone}</ListItem>
            <ListItem>{card.email}</ListItem>
          </List>
        </Box>

        <Flex mx="auto" mt={10} gap={10} direction='column'>
          <Button variant='outline' fz={12} onClick={() => jumpTo(`/card-details/${card._id}`)}>
            <Text fw='bold'>More Info</Text>
          </Button>

          {!myListingsPage && 
            <Button bg='darkgreen'>
              <Text fw='bold'>Apply</Text>
            </Button>}

          {loggedIn && myListingsPage && 
          <Button onClick={() => jumpTo(`/edit-card/${card._id}`)}>
            <IconEdit/>
          </Button>}

          {myListingsPage && 
            <Button bg='red' onClick={() => deleteCard(card)}>
              <IconTrash />
            </Button>}
        </Flex>

        <Group my={10} justify='center' >
          <FavoritesButton card={card} />
          <Button variant='outline' radius="xl" c="blue"><IconShare/></Button>
          <Button variant='outline' radius="xl" c="green"><IconBrandWhatsapp/></Button>
        </Group>
          
        

      </Card.Section>
    </Card>
  );
}