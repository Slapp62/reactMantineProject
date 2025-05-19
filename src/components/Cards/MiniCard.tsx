import { Card, Image, Text, Button, Flex, ListItem, List, Box} from '@mantine/core';
import { TCards } from '@/Types';
import { IconEdit, IconHeart, IconHeartFilled, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { useDeleteCard } from '@/hooks/UseDeleteCard';

export function MiniCard({ card } : { card: TCards }) {
  
  const toggleLike = useLikeUnlike(); 
  const deleteCard = useDeleteCard();
  const jumpTo = useNavigate();
  const location = useLocation();
  const myListingsPage = location.pathname === '/my-listings';

  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const user = useSelector((state: RootState) => state.userSlice.user);
  
  const globalCards = useSelector((state: RootState) => state.cardSlice.cards);
  const thisGlobalCard = globalCards?.find((globalCard) => globalCard._id === card._id);
  const isLiked = thisGlobalCard?.likes.includes(`${user?._id}`)

  const heartOutline = <IconHeart />;
  const heartFilled = <IconHeartFilled/>;

  

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

        <Flex mx="auto" my={20} gap={10} direction='column'>
          <Button variant='outline' fz={12} onClick={() => jumpTo(`/card-details/${card._id}`, {state: {card} })}>
            <Text fw='bold'>More Info</Text>
          </Button>

          {!myListingsPage && 
            <Button bg='green'>
              <Text fw='bold'>Apply</Text>
            </Button>}

          {loggedIn && !myListingsPage && 
            <Button variant='filled' bg='red' onClick={() => toggleLike(card)}>
                {isLiked ? heartFilled : heartOutline}
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

      </Card.Section>
    </Card>
  );
}