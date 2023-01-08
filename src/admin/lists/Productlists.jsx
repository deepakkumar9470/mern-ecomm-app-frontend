import React,{useState,useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios'
import styled from 'styled-components'
import {FaTrash,FaEye} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {deleteProduct} from '../../redux/productSlice'
import EditProduct from '../EditProduct';
import toast from 'react-hot-toast';

const  Productlists =()=> {
  // const {items} = useSelector((state) => state.products)
  const [items,setItems] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () =>{
        try {
          const res = await axios.get('http://localhost:5000/api/product')
          console.log(res.data)
          setItems(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    fetchProducts()
  }, []);

  const deleteProductHandler = (id) =>{
    dispatch(deleteProduct(id))
    toast.error('Product deleted')
    navigate(0)
  }
  console.log(items)
  const rows = items.length > 0  && items?.map((item) => {
    return {
      id:  item._id,
      imageUrl:  item.image.url,
      pName:  item.name,
      pDesc:  item.description,
      price:  item.price.toLocaleString(),
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
            <Delete onClick={()=>deleteProductHandler(params.row.id)}><FaTrash/></Delete>
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

export default Productlists


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

const Edit = styled.button`
  background-color: #52c2f7;
`