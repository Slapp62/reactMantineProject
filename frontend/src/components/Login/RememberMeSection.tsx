import { Link } from 'react-router-dom';
import { Button, Checkbox, Group, Text } from '@mantine/core';

type RememberMeSectionProps = {
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
};

export function RememberMeSection({ rememberMe, setRememberMe }: RememberMeSectionProps) {
  return (
    <>
      <Group justify="space-between" mt="lg">
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.currentTarget.checked)}
        />
      </Group>

      <Group justify="center">
        <Text c="dimmed" size="sm" ta="center" my="lg">
          Don't have an account yet?
        </Text>
        <Button p={0} variant="transparent" component={Link} to="/register">
          Create account
        </Button>
      </Group>
    </>
  );
}