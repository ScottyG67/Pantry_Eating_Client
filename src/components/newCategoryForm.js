import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";

const NewCategoryForm = () => {

    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token') 


    const newCat = (e) => {
        e.preventDefault()
        
        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name: name})
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_categories`,reqObj)
            .then( resp => resp.json() )
            .then(newCategory => {
                dispatch({
                    type:'NEW_CATEGORY',
                    newCategory: newCategory
                })
                setName("")
                }
            ) 
        
    }

    return (
        <div>
            <h1>Find Your Next Meal</h1>
            <Form onSubmit = {newCat}>
                <Form.Group controlId="catName">
                    <Form.Control type="text" placeholder="Search" value ={name} onChange = {(e) => setName(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )

}

export default NewCategoryForm