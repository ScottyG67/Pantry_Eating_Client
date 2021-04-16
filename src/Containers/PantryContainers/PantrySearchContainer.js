import { useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, CardDeck, Card} from 'react-bootstrap'

import NewPantryItemForm from '../../components/NewPantryItemForm'
import PantryItemCard from '../../components/PantryItems/PantryItemCard'

const APIPantrySearch = () => {
    const itemSearchResults = useSelector(state => state.itemSearchResults)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')
    


    const dispatch = useDispatch()


    const saveItem = (item) => {
        console.log(`saving ${item}`)

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

    return (
        // <div>
             <Container>
                {/* <Row> */}
                    {/* <Col> */}
                        <h2>Add New Items</h2>
                        <NewPantryItemForm />
                        <div class = "flex-grid">
                            {itemSearchResults.map(item => { 
                                return <PantryItemCard item={item} clickAction={saveItem} btnTxt = {"Save"} />
                                })
                            }
                        </div>
                    {/* </Col> */}
                {/* </Row> */}
            </Container>
        // </div>
    )
}

export default APIPantrySearch