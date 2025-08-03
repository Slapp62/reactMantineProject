import { IconCards } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Button, Title } from '@mantine/core';

type ActionButtonsProps = {
  user: any; // User type from Redux state
};

export function ActionButtons({ user }: ActionButtonsProps) {
  const isBusiness = user?.userType === 'business';

  if (!user) {
    return (
      <Title order={2} ta="center" style={{ color: 'lightgreen' }}>
        <Link to="register" style={{ textDecoration: '', color: 'lightgreen' }}>
          Register
        </Link>{' '}
        now and start your journey
      </Title>
    );
  }

  if (isBusiness) {
    return (
      <Button
        component={Link}
        to="create-card"
        fullWidth
        mx="auto"
        variant="filled"
        color="blue"
        size="md"
        fz={20}
        rightSection={<IconCards />}
      >
        Create A Listing
      </Button>
    );
  }

  return null;
}