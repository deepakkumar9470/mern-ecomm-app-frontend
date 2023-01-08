import React,{useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import styled from 'styled-components'
import {FaTrash,FaEye} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {fetchOrders} from '../../redux/orderSlice'
import {deleteProduct} from '../../redux/productSlice'
import EditProduct from '../EditProduct';

const  Orderlists =()=> {
  const {list} = useSelector((state) => state.orders)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchOrders())
  }, [dispatch]);

  const deleteProductHandler = (id) =>{
    dispatch(deleteProduct(id))
  }

  const rows = list && list?.map((item) => {
    return {
      id:  item._id,
      imageUrl:  item.image?.url,
      pName:  item.name,
      pDesc:  item.description,
      price:  item.price?.toLocaleString(),
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'imageUrl', headerName: 'Picture', width: 100 ,
      renderCell:(params)=>{
         return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt={params.row.name}/>             
          </ImageContainer>
         )
        
      }},
    { field: 'pName', headerName: 'Name', width: 130 },
    { field: 'pDesc', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 80 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 170,
      renderCell : (params) =>{
        return (
          <Actions>
            <Delete onClick={()=>deleteProductHandler(params.rows.id)}><FaTrash/></Delete>
               <EditProduct prodId={params.row.id}/>
            <View onClick={() =>navigate(`/product/${params.row.id}`)}><FaEye/></View>
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

export default Orderlists


const ImageContainer  = styled.div`
   img{
    height: 40px;
   }

`

const Actions  = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    color: #fff;
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

