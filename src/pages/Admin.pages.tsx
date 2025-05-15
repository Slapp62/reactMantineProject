/* eslint-disable no-console */
import axios from "axios";
import { useEffect, useState } from "react";
import { TUsers } from '../Types'
import { ActionIcon, Anchor, Flex, Group, Loader, Pagination, Table, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const AdminControls = () => {

    const getAllUsers = async () => { 
        try {
            const token = sessionStorage.getItem('token');
            axios.defaults.headers.common['x-auth-token'] = token;
            return await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
        } catch (error) {
            console.error(error);
            return { data: [] };
        }
    }
   
    const [users, setUsers] = useState<TUsers[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        const loadUsers = async () => {
            try {
                setLoading(true);
                const response: { data: TUsers[] } = await getAllUsers();
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            } finally {
              setLoading(false)
            }
        };

        loadUsers();
    }, []);

    
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 30;
    const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  
    if (loading) {
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
        <Table verticalSpacing="sm" maw='75%' mx='auto'>
          <Table.Thead>
            <Table.Tr>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Last Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{paginatedUsers.map((user) => (
            <Table.Tr key={user._id}>
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
                <Text fz="sm">{user.phone}</Text>
              </Table.Td>

              <Table.Td>
                <Group gap={0} justify="flex-end">
                  <ActionIcon variant="subtle" color="gray">
                    <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="red">
                    <IconTrash size={16} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Table.Td>

            </Table.Tr>))}
          </Table.Tbody>
        </Table>
        </Table.ScrollContainer>
              
        <Pagination
            total={Math.ceil(users.length / usersPerPage)}
            value={currentPage}
            onChange={(page)=>{
                setCurrentPage(page);
                window.scrollTo({top:0, behavior:'smooth'});
            }}
            mt="md"
            m="auto"
            />
            
            </Flex>
    )
}

export default AdminControls