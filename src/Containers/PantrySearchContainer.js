import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import {Container, Row, Col, CardDeck, Card} from 'react-bootstrap'

import NewPantryItemForm from '../components/NewPantryItemForm'
import PantryItemCard from '../components/PantryItems/PantryItemCard'

const Pantry = () => {
    const pantryItems = useSelector(state => state.pantryItems)
    const itemSearchResults = useSelector(state => state.itemSearchResults)
    const pantryCats = useSelector(state => state.pantryCats)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')
    


    const dispatch = useDispatch()

    // useEffect( ()=>{
    //     if(userId !== ""){
    //         getPantry()
    //     }
    // },[userId])


    // const getPantry = () => {
        
    //     const reqObj = {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         } 
    //     }
    //     fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
    //         .then( resp => resp.json() )
    //         .then(items => {dispatch({
    //                 type:'SET_PANTRY_ITEMS',
    //                 pantryItems: items
    //             })
    //             }
    //         )
    //         .catch(error => {
    //           console.log(error)
    //           alert("there was an error")})
    // }

    const saveItem = (item) => {
        console.log(`saving ${item}`)
        // debugger

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
            .then( resp => resp.json() )
            .then(savedItem => {
                console.log(savedItem)
                dispatch({
                    type:'SAVE_PANTRY_ITEM',
                    pantryItem: savedItem
                })
            })
            .catch(error => {
              console.log(error)
            //   alert("there was an error")
            })
    }

    // const deleteItem = (item) => {
    //     debugger
        
    //     const reqObj = {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //     }

    //     fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items/${item.id}`,reqObj)
    //         .then( resp => resp.json() )
    //         .then(deletedItem => {
    //             console.log(deletedItem)
    //             dispatch({
    //                 type:'DELETE_PANTRY_ITEM',
    //                 deletedItem: deletedItem
    //             })
    //             alert("Item Deleted")
    //             }
    //         ) 
    // }


    return (
        <div>
             <Container>
                <Row>
                    {/* <Col>
                        <h2>Your Pantry</h2>
                        <div class = "flex-grid">
                            {pantryItems.map(item => <PantryItemCard key = {item.id} item = {item} clickAction={deleteItem} btnTxt={"Delete"}/>) }
                        </div>
                    </Col> */}
                    <Col>
                        <h2>Add New Items</h2>
                        <NewPantryItemForm />
                        <div class = "flex-grid">
                            {itemSearchResults.map(item => { 
                                return <PantryItemCard item={item} clickAction={saveItem} btnTxt = {"Save"} />
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Pantry