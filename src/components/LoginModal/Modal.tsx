import { Modal } from '@mantine/core';
import { LoginForm } from './Login';

export function LoginModal({ opened, onClose }: { opened: boolean, onClose: () => void }) {
  

  return (
    <>
      <Modal opened={opened} onClose={onClose} centered>
        <LoginForm onClose={onClose}/>
      </Modal>
    </>
  );
}