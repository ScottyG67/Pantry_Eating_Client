import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";





const BasicLoginForm = () => {

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
            setUserLogin(data)
            // getPantry(data)
          })
          .catch(error => {
            console.log(error)
            alert("there was an error")})

        setEmail("")
        setPassword("")
      }

    const setUserLogin = (data) => {
      localStorage.setItem("token",data.jwt)
      dispatch({
        type: 'SET_USERNAME',
        username: JSON.parse(data.user).username
      })
      dispatch({
        type: 'SET_USER_ID',
        userId: JSON.parse(data.user).id
      })
      dispatch({
        type: 'SET_LOGGED_IN',
        loggedIn: true
      })
    }

// const getPantry = (data) => {
  
//   const userId = JSON.parse(data.user).id
//   const reqObj = {
//       method: "GET",
//       headers: {
//           Authorization: `Bearer ${data.jwt}`,
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//       } 
//   }
//   fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_categories`,reqObj)
//       .then( resp => resp.json() )
//       .then(pantry => {
//           dispatch({
//               type:'SET_PANTRY',
//               pantry: pantry
//           })
//           }
//       )
//       .catch(error => {
//         console.log(error)
//         alert("there was an error")})
//   }

    return (
        <div>
            <Form inline  onSubmit = {login} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className="mr-sm-2" type="email" placeholder="Email" value ={email} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="mr-sm-2" type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )

}

export default BasicLoginForm