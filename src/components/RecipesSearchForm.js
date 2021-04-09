import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";

const RecipesSearchForm = () => {


    const handleSearch = (e) => {
        e.preventDefault()
        debugger
    }

    return (
        <div>
            <h1>Find Your Next Meal</h1>
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

export default RecipesSearchForm