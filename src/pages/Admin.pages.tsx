/* eslint-disable no-console */
import axios from "axios";
import { useEffect, useState } from "react";
import { TUsers } from '../Types'
import { Pagination } from "@mantine/core";

const AdminControls = () => {

    const getAllUsers = async () => { 
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['x-auth-token'] = token;
            return await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
        } catch (error) {
            console.error(error);
            return { data: [] };
        }
    }
   
    const [users, setUsers] = useState<TUsers[]>([]);

    useEffect(() => { 
        const loadUsers = async () => {
            try {
                const response: { data: TUsers[] } = await getAllUsers();
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadUsers();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 30;
    const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    return (
        <div>
            

            <table >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th>Is Business</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin}</td>
                            <td>{user.isBusiness}</td>
                        </tr>
                    ))}
                </tbody>
            </table>   

        <Pagination
            total={Math.ceil(users.length / usersPerPage)}
            value={currentPage}
            onChange={(page)=>{
                setCurrentPage(page);
                window.scrollTo({top:0, behavior:'smooth'});
            }}
            mt="md"
        />
            
        </div>
    )
}

export default AdminControls