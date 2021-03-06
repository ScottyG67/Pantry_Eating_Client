import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import {DashSquare} from 'react-bootstrap-icons'

const SimplePantryItemForm = ({toggleShowForm,toggleShowRes}) => {
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL) 
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const handleSearch = (e) => {
        e.preventDefault()
        let bodyInfo = ""
        toggleShowRes() 
        bodyInfo = JSON.stringify({
            searchType: 'ingr',
            search: searchText
        })

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
                dispatch({
                    type:'SET_ITEM_SEARCH_RESULTS',
                    itemSearchResults: items
                })
                setSearchText("")
                
            })
            .catch(error => {
              console.log(error)
              alert("there was an error")})
    }

    return (
        <>
        <Form id="text_search"  onSubmit = {handleSearch}>
            <Form.Group controlId="searchQuery">
                <Form.Control type="text" autofocus="true" placeholder="Search" value ={searchText} onChange = {(e) => setSearchText(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Search</Button>
        </Form>
        <DashSquare onClick={toggleShowForm} />
        </>
    )

}

export default SimplePantryItemForm