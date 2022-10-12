import React,  { useState,  useEffect } from "react";
import { useStore } from "../../../stores";
import { observer } from "mobx-react";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UserPage = () => {
    const { userStore } = useStore();
    const [error] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData(1, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (currentPage, pageSize, sortName, sortDirection) => {
        await userStore.getUsersAsync(currentPage, pageSize, sortName, sortDirection);
        setIsLoaded(true);
      }

    const handlePageChange = page => {
        setCurrentPage(page);
        fetchData(page, pageSize);
      }
    
      const handlePerRowsChange = async (newPageSize, page) => {
        setPageSize(newPageSize);
        fetchData(page, newPageSize);
      }

      const handleSort = (selectedColumn, sortDirection) => {
        fetchData(currentPage, pageSize, selectedColumn.key, sortDirection);
      }

      const [show, setShow] = useState(false);
      const [id, setId] = useState(0);

      const handleClose = () => setShow(false);
      const handleShow = (id) => 
      {
        setShow(true);
        setId(id);
      };
      const columns = [
        {
            key: 'FirstName',
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            key: 'LastName',
            name: 'Last Name',
            cell: row => row.lastName,
            sortable: true
        },
        {
            key: 'Username',
            name: 'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            key: 'Email',
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status
        },
        {
            name: 'Action',
            cell: row =>
              (
                <td>
                 <button onClick={() => handleShow(row.id)}>Delete</button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="contained" color="error" onClick={() => 
                        {
                            userStore.deleteUserAsync(id);
                            handleClose();
                        }}>
                        Yes
                      </Button>
                      <Button variant="contained" onClick={handleClose}>
                        No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <button><Link to={'/edit-user/' + row.id}>Edit</Link></button>
                </td>
              )
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
                        title="Users"
                        columns={columns}
                        data={userStore.userList}
                        pagination
                        paginationServer
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        paginationTotalRows={userStore.totalCount}
                        onSort={handleSort}  
                    />     
                </div>
            </div>
        )
    }
}

export default observer(UserPage);