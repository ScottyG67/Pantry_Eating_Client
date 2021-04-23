import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
// const BASE_URL = 'http://localhost:3000'

const SignUp = ({history}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")


    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL)

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
            dispatch({
              type: 'SET_USERNAME',
              username: data.user.username
            })
            dispatch({
              type: 'SET_USER_ID',
              username: data.user.id.toString()
            })
            dispatch({
              type: 'SET_LOGGED_IN',
              loggedIn: true
            })
            // history.push('/')
        })
        .catch(error => {
          console.log(error)
          localStorage.clear()
          alert('Your email or password did not meet requirements')
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