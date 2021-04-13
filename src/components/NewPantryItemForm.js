import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";

const NewPantryItemForm = () => {
    const [upc, setUpc] = useState("")
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL) 
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const handleSearch = (e) => {
        e.preventDefault()
        let bodyInfo = ""
         
        if(e.target.id ==="upc_search"){
            bodyInfo = JSON.stringify({
                searchType: 'upc',
                search: upc
            })
        } else {
            bodyInfo = JSON.stringify({
                searchType: 'ingr',
                search: searchText
            })
        }

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: bodyInfo
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/item_search`,reqObj)
            .then( resp => resp.json() )
            .then(items => {
                console.log(items.hints)
                dispatch({
                    type:'SET_ITEM_SEARCH_RESULTS',
                    itemSearchResults: items
                })
                setSearchText("")
                setUpc("")

            })
            .catch(error => {
              console.log(error)
              alert("there was an error")})
    }

    return (
        <div>
        <h1>Find Item</h1>
        <Form id="upc_search" onSubmit = {handleSearch}>
            <Form.Label>UPC</Form.Label>
            <Form.Group controlId="searchQuery">
                <Form.Control type="text" placeholder="Search" value ={upc} onChange = {(e) => setUpc(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <h3>Or</h3>
        <Form id="text_search"  onSubmit = {handleSearch}>
            <Form.Label>Item Name</Form.Label>
            <Form.Group controlId="searchQuery">
                <Form.Control type="text" placeholder="Search" value ={searchText} onChange = {(e) => setSearchText(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>

    </div>
    )

}

export default NewPantryItemForm