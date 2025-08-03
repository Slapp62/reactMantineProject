import { Text, Title } from '@mantine/core';

type WelcomeMessageProps = {
  user: any; // User type from Redux state
};

export function WelcomeMessage({ user }: WelcomeMessageProps) {
  if (!user) {
    return (
      <Title ta="center" c="white">
        Find your next career!
      </Title>
    );
  }

  return (
    <Text ta="center" c="blue" fw="bold" fz={30}>
      Welcome Back
    </Text>
  );
}