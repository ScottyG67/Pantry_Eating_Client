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

    const upcSearch = (e) => {
        alert("upc search currently non functional")
        const imageFile = e.target.files[0]
        debugger
        // var barcodeDetector = new BarcodeDetector({formats: ['code_39', 'codabar', 'ean_13']});
        // BarcodeDetector.getSupportedFormats()
        // .then(supportedFormats => {
    
        //   const barcodeDetector = new BarcodeDetector({formats: supportedFormats})
        //   const reader = new FileReader();
    
        //   reader.onload = function(e) {
        //     const img = new Image()
        //     img.src = e.target.result
    
        //     img.decode().then(() => {
        //       barcodeDetector.detect(img)
        //       .then(barcodes => {
        //         barcodes.forEach(barcode => console.log(barcode));
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       })
        //     })
        //   };
    
        //   reader.readAsDataURL(imageFile);
        // });
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
        <Form>
        <Form.Label>UPC Barcode Picture</Form.Label>
            <Form.File 
                id="custom-file"
                label="Upload Picture"
                custom
                onChange = {upcSearch}
            />
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