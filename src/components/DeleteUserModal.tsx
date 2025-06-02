import { Modal, Group, Button, Text } from "@mantine/core";

type DeleteUserModalProps = {
  opened: boolean;
  close: () => void;
  deleteUser: (id?: string) => void;
  id?: string;
};

export const DeleteUserModal = ({opened, close, deleteUser, id}: DeleteUserModalProps) => {

    const handleDelete = () => {
        deleteUser(id);
    }

    return (
        <Modal centered opened={opened} onClose={close} title="Confirmation">
            <Text>Are you sure you want to delete your account?</Text>
            <Group mt={20} justify="center">
                <Button color="red" onClick={handleDelete}>Yes, Delete It</Button>
                <Button variant="outline" onClick={close}>No, I'll Stay</Button>
            </Group>
        </Modal>
    )
}