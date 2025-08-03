import { IconMoodSad2 } from '@tabler/icons-react';
import { Box, Title } from '@mantine/core';

export function EmptyJobListings() {
  return (
    <Box ta="center">
      <IconMoodSad2 color="red" size={80} />
      <Title order={2} fw={700} c="red">
        No Cards Found
      </Title>
    </Box>
  );
}