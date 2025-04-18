import { Card, Image, Text, Group } from '@mantine/core';
import { Tcards } from '../Types';

export function BizCard({ card } : { card: Tcards }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={300} h="fit-content" withBorder>
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
        <p>{card.description}</p>
        <hr/>
        <p>{card.subtitle}</p>
        <ul>
          <li>{card.phone}</li>
          <li>{card.email}</li>
        </ul>
      </Text>

    </Card>
  );
}