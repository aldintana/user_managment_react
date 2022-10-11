import { useEffect } from "react";
import { useStore } from "../../../stores";

const UserPage = () => {
    const { userStore } = useStore();

    useEffect(() => {
        userStore.getUsersAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>               
                <input ref={userStore.searchText} placeholder="Search Text.."></input>
                <button onClick={() => userStore.getUsersAsync()} >Search</button>
                {userStore.noUsers ? 'No users!' :
                    <table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                            <tbody>
                                {userStore.userList.map((user, index) =>

                                    <tr key={index}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button onClick={() => userStore.deleteUserAsync(user.id)} >Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default UserPage;