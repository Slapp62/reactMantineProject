import { Card, Image, Text, Button, Flex, ListItem, List, Box} from '@mantine/core';
import { TCards } from '@/Types';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { useMediaQuery } from '@mantine/hooks';

export function MiniCard({ card } : { card: TCards }) {
  const isMobile = useMediaQuery('(max-width: 700px)')
  const toggleLike = useLikeUnlike(); 

  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const user = useSelector((state: RootState) => state.userSlice.user);
  
  const globalCards = useSelector((state: RootState) => state.cardSlice.cards);
  const thisGlobalCard = globalCards?.find((globalCard) => globalCard._id === card._id);
  const isLiked = thisGlobalCard?.likes.includes(`${user?._id}`)

   const jumpTo = useNavigate();

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
          <Button variant='outline' fz={12} onClick={() => jumpTo(`/card-details/${card._id}`)}>
            <Text fw='bold'>More Info</Text>
          </Button>

          <Button bg='green'>
            <Text fw='bold'>Apply</Text>
          </Button>

          {loggedIn && <Button variant='filled' bg='red' onClick={() => toggleLike(card)}>
              {isLiked ? heartFilled : heartOutline}
          </Button>}
        </Flex>

      </Card.Section>
    </Card>
  );
}