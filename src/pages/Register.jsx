import React,{useState,useEffect} from 'react'
import {Container,Button,Row,Col, Form} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import  './register.css'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser} from '../redux/authSlice'

const Register = () => {
    const auth = useSelector((state) => state.auth)
    console.log('auth register', auth)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
     if(auth._id) {
      navigate('/cart')
     }
    }, [auth._id,navigate])
    
    const signupHandler = (e) =>{
        e.preventDefault()
        dispatch(registerUser({name,email,password}))
         
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="register_form">
                <Form style={{width :  "100%"}} onSubmit={signupHandler}>
                    <h2>Signup to your account</h2>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          className="input" 
                          type="text" 
                          value={name}
                          required
                          onChange={(e)=>setName(e.target.value)}
                          placeholder="Enter name"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          className="input" 
                          type="email" 
                          value={email}
                          required
                          onChange={(e)=>setEmail(e.target.value)}
                          placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          className="input" 
                           type="password" 
                           value={password}
                           required
                           onChange={(e)=>setPassword(e.target.value)}
                           placeholder="Enter password"/>
                    </Form.Group>

                    <Form.Group>
                       <Button className="login_btn" type="submit">
                        {auth.registerStatus === "pending" ? "Submitting" : "SignUp"}
                        </Button>
                        
                       {auth.registerStatus === "rejected" ? 
                         (<p>{auth.registerError}</p>)
                          :null}

                       <p className="para">Already have account create account 
                         <Link className="para_link" to="login">Signin</Link></p>

                       
                    </Form.Group>

                </Form>
            </Col>
            <Col md={5} className="register_image_container"></Col>
        </Row>
    </Container>
  )
}

export default Register