import { Card, Image, Text, Group, Button, Flex } from '@mantine/core';
import { Tcards } from '../Types';
import { IconHeart, IconHeartFilled, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';

export function BizCard({ card } : { card: Tcards }) {
  const heartOutline = <IconHeart/>;
  const heartFilled = <IconHeartFilled/>;
  const [isLiked, setLiked] = useState(false);

  

  return (
    <Card shadow="sm" padding="lg" mx={-15} radius="md" w={300} withBorder>
      <Card.Section>
        <Image
          src={card.image.url}
          height={160}
          alt="picture"
          fit='cover'
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

      <Flex mt={10}>
        <Button w={80}><IconPhone/></Button>
        <Button variant='filled' ml='auto' w={80} onClick={()=>setLiked(!isLiked)}>{isLiked === true ? heartFilled : heartOutline}</Button>
      </Flex>
      
      
    </Card>
  );
}