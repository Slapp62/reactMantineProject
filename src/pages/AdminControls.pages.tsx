import axios from "axios";
import { useState } from "react";
import { ActionIcon, Anchor, Flex, Loader, Pagination, Table, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser, toggleAdminView } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllUsers } from "@/hooks/UseGetAllUser";

const AdminControls = () => {
  const dispatch = useDispatch();
  const jumpTo = useNavigate();
  const {allUsers, isLoading} = useGetAllUsers();

  const deleteUser = async (id: string) => {
    const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
        const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`);
        if (response.status === 200){
            toast.warning('Account Deleted.', {position: 'bottom-right'})
            dispatch(removeUser(id));
        }
    } catch (error : any) {
        toast.error(`Account Deletion Failed! ${error.message}`, {position: `bottom-right`});
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 30;
  const paginatedUsers = allUsers ? allUsers.slice(
  (currentPage - 1) * usersPerPage, currentPage * usersPerPage) : [];

  if (isLoading) {
      return  <>
        <Flex align="center" direction="column" mt={100}>
          <Text size="xl" fw={600}>Users Are Loading</Text>
          <Loader color="cyan" size="xl" mt={30}/>
        </Flex>;
      </>
  }

  return (
      <Flex direction="column" w="100%">
      <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" maw='75%' mx='auto' >
        <Table.Thead>
          <Table.Tr>
              <Table.Th/>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Last Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Account Type</Table.Th>
              <Table.Th>Date Created</Table.Th>
              <Table.Th>Edit</Table.Th>
              <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{paginatedUsers.map((user) => (
          <Table.Tr key={user._id}>
            <Table.Td styles={{td: {borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}}>
              <Text fz="sm" fw="bold" c="dimmed" ta='center'>
                {paginatedUsers.indexOf(user) + 1}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text fz="sm" fw={500}>
                {user.name.first}
              </Text>
            </Table.Td>
      
            <Table.Td>
              <Text fz="sm" fw={500}>
                  {user.name.last}
              </Text>
            </Table.Td>

            <Table.Td>
              <Anchor component="button" size="sm">
                {user.email}
              </Anchor>
            </Table.Td>

            <Table.Td>
              <Text fz="sm">{user.isAdmin ? 'Admin' : user.isBusiness ? 'Business' : 'Regular'}</Text>
            </Table.Td>

            <Table.Td>
              <Text fz="sm">{new Date(user.createdAt).toLocaleString()}</Text>
            </Table.Td>

            <Table.Td>
                <ActionIcon size={30} variant="outline" color="yellow" onClick={() => {
                  dispatch(toggleAdminView(true));
                  jumpTo(`/edit-profile/${user?._id}`)
                }}>
                  <IconPencil size={25} stroke={1.5}/>
                </ActionIcon>              
            </Table.Td>

            <Table.Td styles={{td: {borderRight: '1px solid #eee' }}}>
                <ActionIcon size={30} variant="outline" color="red" onClick={() => {deleteUser(user._id)}}>
                  <IconTrash size={25} stroke={1.5}/>
                </ActionIcon>              
            </Table.Td>

          </Table.Tr>))}
        </Table.Tbody>
      </Table>
      </Table.ScrollContainer>
            
      {allUsers && 
      <Pagination
        total={Math.ceil(allUsers.length / usersPerPage)}
        value={currentPage}
        onChange={(page)=>{
            setCurrentPage(page);
            window.scrollTo({top:0, behavior:'smooth'});
        }}
        mt="md"
        m="auto"
      />}
          
    </Flex>
  )
}

export default AdminControls