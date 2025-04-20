import { Card, Image, Text, Group, Button } from '@mantine/core';
import { Tcards } from '../Types';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';

export function BizCard({ card } : { card: Tcards }) {
  const heartOutline = <IconHeart/>;
  const heartFilled = <IconHeartFilled/>;
  const [isLiked, setLiked] = useState(false);

  

  return (
    <Card shadow="sm" padding="lg" radius="md" w={300} withBorder>
      <Card.Section>
        <Image
          src={card.image.url}
          height={160}
          alt="picture"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{card.title}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        <Text truncate w={250}>{card.description}</Text>
        <hr/>
        <p>{card.subtitle}</p>
        <ul>
          <li>{card.phone}</li>
          <li>{card.email}</li>
        </ul>
      </Text>

      <Button variant='filled' color='violet' ml='auto' mt={10} w={80} onClick={()=>setLiked(!isLiked)}>{isLiked === true ? heartFilled : heartOutline}</Button>
      
    </Card>
  );
}