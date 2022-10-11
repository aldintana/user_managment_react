import React,  { useState,  useEffect } from "react";
import { useStore } from "../../../stores";
import { observer } from "mobx-react";
import DataTable from "react-data-table-component";




const UserPage = () => {
    const { userStore } = useStore();
    const [error] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchData(1, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (currentPage, pageSize) => {
        await userStore.getUsersAsync(currentPage, pageSize);
        setIsLoaded(true);
      }

    const handlePageChange = page => {
        fetchData(page, pageSize);
      }
    
      const handlePerRowsChange = async (newPageSize, page) => {
        setPageSize(newPageSize);
        fetchData(page, newPageSize);
      }
      const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName
        },
        {
            name: 'Last Name',
            cell: row => row.lastName
        },
        {
            name: 'Username',
            selector: row => row.username
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Status',
            selector: row => row.status
        },
        {
            name: 'Action',
            selector: row => <td><button onClick={() => userStore.deleteUserAsync(row.id)} >Delete</button></td>
        },
      ];

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <div>               
                    <input ref={userStore.searchText} placeholder="Search Text.."></input>
                    <button onClick={() => userStore.getUsersAsync()} >Search</button>
                    <DataTable 
                        columns={columns}
                        data={userStore.userList}
                        pagination
                        paginationServer
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        paginationTotalRows={userStore.totalCount}                
                    />     
                </div>
            </div>
        )
    }
}

export default observer(UserPage);