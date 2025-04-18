import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AuthenticationTitle } from './Login';

export function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <AuthenticationTitle/>
      </Modal>

      <Button variant="default" onClick={open}>
        Login
      </Button>
    </>
  );
}