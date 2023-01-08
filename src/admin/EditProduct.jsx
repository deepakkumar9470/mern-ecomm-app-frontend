import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Backdrop, Box, Modal, Fade, Typography, DialogContent, DialogActions } from '@mui/material';
import { FaEdit } from 'react-icons/fa'
import './edit-product.css'
import {useNavigate} from 'react-router-dom'
import {Row,Col,Form,Container,Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {editProduct } from '../redux/productSlice';
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  margin : '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditProduct = ({prodId}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [currentProduct,setCurrentProduct] = useState({})     
  
  const [previewImage,setPreviewImage] = useState("")     
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name,setName] = useState("")    
  const [price,setPrice] = useState("")   
  const [description,setDescription] = useState("")   
  const [productImage,setProductImage] = useState("")     
  const [category,setCategory] = useState("") 

  const [products,setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () =>{
        try {
          const res =await axios.get('http://localhost:5000/api/product')
          console.log(res.data)
          setProducts(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    fetchProducts()
  }, [])
  
  const handleOpen = () => {
    setOpen(true);
    let selectedProd = products && products.filter(item => item._id === prodId);
    selectedProd = selectedProd[0]
    console.log('selectedProd', selectedProd)
    setCurrentProduct(selectedProd)
    setPreviewImage(selectedProd.image.url)
    setProductImage("")

    setName(selectedProd.name)
    setCategory(selectedProd.category)
    setDescription(selectedProd.description)
    setPrice(selectedProd.price)
  }

  const addProductHandler = (e) =>{
     e.preventDefault()
   
     dispatch(editProduct({
       productImage,
       product : {
        ...currentProduct,
        name :name,
        price :price,
        category :category,
        description :description,
       }
     }))
     navigate(0)
      
  
  }

  const transFormFile = (file) =>{
    const reader = new FileReader()
    if(file) {
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
          setProductImage(reader.result)
          setPreviewImage(reader.result)
      }
    } else{
      setProductImage('')
    }
  }

  const handleFileUpload = (e) =>{
     const file = e.target.files[0]
     console.log(file)
     transFormFile(file)
  }

  


  return (
    <StyleEditContainer>
      <Edit onClick={handleOpen}><FaEdit /></Edit>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Your Product
            </Typography>
            <DialogContent>
                   
              <Container className="p-4 mt-5">
                <Row>
                  <Col md={6} className="add_form">

                    <Form onSubmit={addProductHandler}>
                      <h2>Edit  Product</h2>


                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter product name" />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Product description</Form.Label>
                        <Form.Control
                          className="input"
                          as="textarea"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter product description" />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                          className="input"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter product price" />
                      </Form.Group>

                      <Form.Group value={category}  onChange={(e) => setCategory(e.target.value)} className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select  aria-label="Default select example">
                          <option disabled defaultValue>-- Select Category --</option>
                          <option value="technology">Technology</option>
                          <option value="electronics">Electronics</option>
                          <option value="travel">Travel</option>
                          <option value="wear">Styles</option>
                          <option value="phones">Phones</option>
                          <option value="groceries">Groceries</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Product image</Form.Label>
                        <Form.Control
                          className="input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload} />
                      </Form.Group>


                      <Form.Group>
                        <Button type="submit">Add</Button>
                      </Form.Group>
                    </Form>
                  </Col>

                  <Col md={4} className="image_preview">

                    {
                      !previewImage ? (<h5>Image preview will appear here! </h5>) : (
                        <img className="prev_img" src={previewImage} alt="previmg" />
                      )
                    }
                  </Col>
                </Row>
              </Container>
             
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>  
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </StyleEditContainer>
  );
}

export default EditProduct

const StyleEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Edit = styled.button`
    border: none;
    outline: none;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
    background-color: #427eee;
`