import { Text } from '@mantine/core';

type LoginStatusProps = {
  isBlocked: boolean;
  loginAttempts: number;
  momentBlocked: number;
};

export function LoginStatus({ isBlocked, loginAttempts, momentBlocked }: LoginStatusProps) {
  const attemptsLeft = 3 - loginAttempts;

  if (isBlocked) {
    const timeLeft = Math.floor(Math.max(0, (60000 - (Date.now() - momentBlocked)) / 1000));
    return (
      <Text c="red" ta="center" mt="sm">
        You must wait {timeLeft} seconds before you can login in again.
      </Text>
    );
  }

  if (loginAttempts > 0) {
    return (
      <Text c="red" ta="center" mt="sm">
        You have {attemptsLeft} attempt(s) remaining.
      </Text>
    );
  }

  return null;
}