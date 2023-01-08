import React,{useState} from 'react'
import {Container,Button,Row,Col, Form} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import  './login.css'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../redux/authSlice'


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = (e) =>{
        e.preventDefault()  
        dispatch(loginUser({email,password})) 
        navigate('/cart')
    }

  return (
    <Container className='login_container'>
        <Row>
            <Col md={6} className="login_form">
                <Form style={{width :  "100%"}} onSubmit={loginHandler}>
                    <h2>Login to your account</h2>
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
                        {auth.loginStatus === "pending" ? "Submitting" : "Login"}
                        </Button>
                        
                       {auth.loginStatus === "rejected" ? 
                         (<p>{auth.loginError}</p>)
                          :null}
                      
                       <p className="para">Don't have account create account 
                         <Link className="para_link" to="signup">SignUp</Link></p>
                    </Form.Group>

                </Form>
            </Col>
            <Col md={5} className="login_image_container"></Col>
        </Row>
    </Container>
  )
}

export default Login