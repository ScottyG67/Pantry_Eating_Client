import {useState} from 'react'
import { Form, Button } from "react-bootstrap";
const BASE_URL = 'http://localhost:3000'

const SignUp = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")

    const signup = (e) => {
        e.preventDefault()
        
        let reqObj = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            user: {
                username: e.target.formBasicUsername.value,
                email: e.target.formBasicEmail.value,
                password: e.target.formBasicPassword.value
            }
          })
        }
    
        fetch(`${BASE_URL}/api/v1/users`, reqObj)
          .then(res => res.json())
          .then(data => { 
            localStorage.setItem("token",data.jwt)
            debugger
        })
        e.target.reset()
        setEmail("")
        setPassword("")
      }

    return (
        <div>
            <h1>Create Account</h1>
            <Form onSubmit = {signup}>
            <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" value ={username} onChange = {(e) => setUsername(e.target.value)}/>
                    <Form.Text className="text-muted">Literally all we use this for is to say hello.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value ={email} onChange = {(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
                    <Form.Text className="text-muted">We hash the crap out of it, so rest easy</Form.Text>
                    <Form.Text className="text-muted">Must be at least 8 characters</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">Sign Up!</Button>
            </Form>
        </div>
    )

}

export default SignUp