import React,{useState} from 'react'

import {Row,Col,Form,Container,Button} from 'react-bootstrap'
import './add-product.css'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addProducts} from '../redux/productSlice'
const CreateProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name,setName] = useState("")    
    const [price,setPrice] = useState("")   
    const [description,setDescription] = useState("")   
    const [productImage,setProductImage] = useState("")     
    const [category,setCategory] = useState("") 
    


    const addProductHandler = (e) =>{
       e.preventDefault()
       if(!name || !price || !description || !productImage || !category){
        return alert('please fill all fields..')
       }
       dispatch(addProducts({
        name,
        description,
        price,
        category, 
        image:  productImage
       }))
         navigate('/')   
    
    }

    const handleFileUpload = (e) =>{
       const file = e.target.files[0]
       console.log(file)
       transFormFile(file)
    }

    const transFormFile = (file) =>{
          const reader = new FileReader()
          if(file) {
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                setProductImage(reader.result)
            }
          } else{
            setProductImage('')
          }
    }

  return (
    <Container className="p-3 mt-2">

      <Row>
        <Col md={6} className="add_form">
          
           <Form onSubmit={addProductHandler}>
             <h2>Create new Product</h2>
           
           <Form.Group className="mb-1"  controlId="formBasicEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control 
                className="input" 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder="Enter product name" />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Product description</Form.Label>
            <Form.Control 
                className="input" 
                as="textarea"
                value={description}
                onChange={(e)=>setDescription(e.target.value)} 
                placeholder="Enter product description" />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Product Price</Form.Label>
            <Form.Control 
                className="input" 
                type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)} 
                placeholder="Enter product price" />
          </Form.Group>

          <Form.Group onChange={(e)=> setCategory(e.target.value)} className="mb-1" controlId="formBasicEmail">
          <Form.Label>Product Category</Form.Label>
          <Form.Select aria-label="Default select example">
              <option disabled selected>-- Select Category --</option>
              <option value="technology">Technology</option>
              <option value="electronics">Electronics</option>
              <option value="travel">Travel</option>
              <option value="wear">Styles</option>
              <option value="phones">Phones</option>
              <option value="groceries">Groceries</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Product image</Form.Label>
            <Form.Control 
                className="input" 
                type="file"
                accept="image/*"
                onChange={handleFileUpload}/>
          </Form.Group>

        
            <Form.Group>
            <Button type="submit">Add</Button>   
            <p className="para">Don't have account create account 
            <Link className="para_link" to="/signup">SignUp</Link></p>
            </Form.Group>
           </Form>
        </Col>

        <Col md={4} className="image_preview">
          
             {
              !productImage ? (<h5>Image preview will appear here! </h5>) : (
                       <img className="prev_img" src={productImage} alt="previmg" />
              )
             }
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProduct