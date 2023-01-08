import React,{useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import styled from 'styled-components'
import {FaTrash,FaEye} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {fetchAllUsers,deleteUser} from '../../redux/usersSlice'

const  Productlists =()=> {
  const {list} = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
    
  }, [dispatch]);

  const deleteUserHandler = (id) =>{
    dispatch(deleteUser(id))
  };


  const rows = list.length > 0  && list?.map((user) => {
    return {
      id:  user._id,
      uName:  user.name,
      uEmail:  user.email,
      isAdmin:  user.isAdmin,
     
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'pName', headerName: 'Name', width: 150 },
    { field: 'uEmail', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Role', width: 100,
    renderCell : (params) =>{
        return (
          <Actions>
           {params.row.isAdmin ? <Admin>Admin</Admin> : <Customer>Customer</Customer>}
          </Actions>
        )
      } },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell : (params) =>{
        return (
          <Actions>
            <Delete onClick={()=>deleteUserHandler(params.rows.id)}><FaTrash/></Delete>
            <View onClick={() =>navigate(`/user/${params.row.id}`)}><FaEye/></View>
          </Actions>
        )
      }
    }
   
  ];
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default Productlists



const Actions  = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    color: #473131;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
  }

`

const Delete = styled.button`
  background-color: rgb(255,77,73);
`

const View = styled.button`
  background-color: rgb(114,255,40);
`

// const Edit = styled.button`
//   background-color: #52c2f7;
// `
const Admin = styled.div`
    color: rgb(253,181,40);
    background-color: rgba(253,181,40, 0.12);
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
`

const Customer = styled.div`
    color: rgb(38,198,249);
    background-color: rgba(38,198,249, 0.12);
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
`