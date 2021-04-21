import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import {SearchFail} from './PopupMessages'

const NewPantryItemForm = () => {
    const [upc, setUpc] = useState("")
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.BASE_URL) 
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')
    const [showPopup, setShowPopup] = useState(false);

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
                if(!items.error){
                    dispatch({
                        type:'SET_ITEM_SEARCH_RESULTS',
                        itemSearchResults: items
                    })
                } else {
                    setShowPopup(true)
                }
                setSearchText("")
                setUpc("")
            })
            .catch(error => {
              console.log(error)
              dispatch({
                type:'SET_ITEM_SEARCH_RESULTS',
                itemSearchResults: []
                })
              alert("Sorry, nothing was found")})
    }

    const handleClose = () => {
        setShowPopup(false);
    }

    

    return (
        <div>
            <Form  id="text_search"  onSubmit = {handleSearch}>
                <Form.Label as = 'h4'>By Name</Form.Label>
                <Form.Group controlId="searchQuery">
                    <Form.Control type="text" placeholder="Search" value ={searchText} onChange = {(e) => setSearchText(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Search</Button>
            </Form>

            <Form  id="upc_search" onSubmit = {handleSearch}>
                <Form.Label as = 'h4'>By UPC Code</Form.Label>
                <Form.Group controlId="searchQuery">
                    <Form.Control type="text" placeholder="Search" value ={upc} onChange = {(e) => setUpc(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Search</Button>
            </Form>
           
            {/* <Form inline >
                <Form.Label as = 'h4'>UPC Barcode Picture</Form.Label>
                <Form.File  id="custom-file" onChange = {upcSearch}/>
            </Form> */}
            <SearchFail show ={showPopup} handleClose ={handleClose}/>
        </div>
    )

}

export default NewPantryItemForm