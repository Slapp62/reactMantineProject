import { IconArrowUp } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={scrollToTop}
      mt={20}
      c="green"
      variant="light"
      rightSection={<IconArrowUp />}
    >
      Back to Top
    </Button>
  );
}