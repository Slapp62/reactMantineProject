import { Card, Image, Text, Button, Flex, ListItem, List, Box} from '@mantine/core';
import { TCards } from '@/Types';
import { IconHeart, IconHeartFilled, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { addFavorite } from '@/store/cardSlice';

export function MiniCard({ card } : { card: TCards }) {
  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn)
  const dispatch = useDispatch();
  const jumpTo = useNavigate();
  
  const heartOutline = <IconHeart />;
  const heartFilled = <IconHeartFilled/>;
  const [isLiked, setLiked] = useState(false);

  const likedHandler = (card: TCards) => {
      const likedState = !isLiked;
      setLiked(likedState)

      if (likedState === true) {
        toast.success('Card Liked!', {
          position: 'bottom-right'
        });
        dispatch(addFavorite(card));
        
      } else {
        toast.warning('Card Unliked!', {
          position: 'bottom-right'
        })
      }    
  }

  return (
    <Card h='100%' shadow="sm" padding="lg" mx={-15} radius="md" w={300} withBorder>
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

      <Card.Section p={15}>
        <Text mb="xs" fw={500}>{card.title}</Text>
      
        <Box>
          <Text truncate w={250}>{card.description}</Text>
          <hr/>
          <Text>{card.subtitle}</Text>
          <List>
            <ListItem>{card.phone}</ListItem>
            <ListItem>{card.email}</ListItem>
          </List>
        </Box>

        <Flex p={10} justify='space-between'>
          <Button fz={12} onClick={() => jumpTo(`/card-details/${card._id}`)}>Details</Button>

          <Button bg='blue'><IconPhone/></Button>

          {loggedIn && <Button variant='filled' bg='purple' onClick={() => likedHandler(card)}>
              {isLiked === true ? heartFilled : heartOutline}
          </Button>}
        </Flex>

      </Card.Section>
    </Card>
  );
}