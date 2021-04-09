import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";



const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL)


    const login = (e) => {

        e.preventDefault()
        
    
        let reqObj = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            user: {
            email: e.target.formBasicEmail.value,
            password: e.target.formBasicPassword.value
            }
          })
        }
    
        fetch(`${BASE_URL}/api/v1/login`, reqObj)
          .then(res => res.json())
          .then(data => { 
            localStorage.setItem("token",data.jwt)
            // username is passed back as  Add to Store
            dispatch({
              type: 'SET_USERNAME',
              username: JSON.parse(data.user).username
            })
            dispatch({
              type: 'SET_LOGGED_IN',
              loggedIn: true
            })
            // JSON.parse(data.user).username
          })
    
        e.target.reset()
        setEmail("")
        setPassword("")
        
      }


    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit = {login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value ={email} onChange = {(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
                    <Form.Text className="text-muted">We hash the crap out of it, so rest easy</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )

}

export default Login