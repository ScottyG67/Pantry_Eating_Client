import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";

const RecipesSearchForm = () => {

    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL) 


    const handleSearch = (e) => {
        e.preventDefault()

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({searchText: searchText})
        }

        fetch(BASE_URL+'/api/v1/recipes_search',reqObj)
        .then(res => res.json())
        .then(resp => {
                dispatch({
                    type: 'SET_RECIPES',
                    searchRecipes: resp.hits
                })
                setSearchText("")
            })
        .catch(console.log)
    }

    const done = () => {
        dispatch({
            type: 'SET_RECIPES',
            searchRecipes: []
        })
    }

    return (
        <div>
            <h1>Find Your Next Meal</h1>
            <Form onSubmit = {handleSearch}>
                <Form.Group controlId="searchQuery">
                    <Form.Control type="text" placeholder="Search" value ={searchText} onChange = {(e) => setSearchText(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Search</Button>
                <Button variant ="secondary" onClick={done}>Done</Button>
            </Form>
        </div>
    )

}

export default RecipesSearchForm