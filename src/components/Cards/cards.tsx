import { Card, Image, Text, Button, Flex} from '@mantine/core';
import { Tcards } from '@/Types';
import { IconHeart, IconHeartFilled, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function BizCard({ card } : { card: Tcards }) {
  const heartOutline = <IconHeart />;
  const heartFilled = <IconHeartFilled/>;
  const [isLiked, setLiked] = useState(false);

  const likedHandler = () => {
      setLiked(!isLiked)
      {isLiked !== true ? 
        toast.success('Card Liked!', {
          position: 'top-right'
        })
        :
        toast.warning('Card Unliked!', {
          position: 'top-right'
        })
    }
  }
  return (
    <Card shadow="sm" padding="lg" mx={-15} radius="md" w={300} withBorder>
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
      
        <Text size="sm" c="dimmed">
          <Text truncate w={250}>{card.description}</Text>
          <hr/>
          <p>{card.subtitle}</p>
          <ul>
            <li>{card.phone}</li>
            <li>{card.email}</li>
          </ul>
        </Text>

        <Flex py={20} px='xl'>
          <Button w={80}><IconPhone/></Button>
          <Button variant='filled' ml='auto' w={80} onClick={likedHandler}>
              {isLiked === true ? heartFilled : heartOutline}
          </Button>
        </Flex>

      </Card.Section>
    </Card>
  );
}