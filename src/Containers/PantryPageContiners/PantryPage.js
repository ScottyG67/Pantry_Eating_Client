import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Col, Container, Row, CardColumns, Card} from 'react-bootstrap'
import {FolderPlus} from 'react-bootstrap-icons'
import { DragDropContext} from 'react-beautiful-dnd';

// import PantryItemCard from '../components/PantryItems/PantryItemCard'
// import PantryItemListElement from '../components/PantryItems/PantryItemListElement'

import PantryCatCard from '../../components/PantryCategory/PantryCatCard'
import NewCategoryForm from '../../components/NewCategoryForm'


const PantryPage = () => {
    const pantryCats = useSelector(state => state.pantryCats)
    const pantryItems = useSelector(state => state.pantryItems)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')

    const [showForm, setShowForm] = useState(false)
    
    const dispatch = useDispatch()

    useEffect( ()=>{
        if(userId !== ""){
            getCategories()
            getPantry()
        }
    },[userId])

    const getCategories = () => {
        
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            } 
        }
        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_categories`,reqObj)
            .then( resp => resp.json() )
            .then(pantry => {
                dispatch({
                    type:'SET_PANTRY',
                    pantry: pantry
                })
                dispatch({
                    type:'SET_PANTRY_CATS',
                    pantryCats: pantry
                })
                }
            )
            .catch(error => {
              console.log(error)
              alert("there was an error")})
    }

    const getPantry = () => {
        
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            } 
        }
        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
            .then( resp => resp.json() )
            .then(pantryItems => {
                dispatch({
                    type:'SET_PANTRY_ITEMS',
                    pantryItems: pantryItems
                })
                }
            )
            .catch(error => {
              console.log(error)
              alert("there was an error")})
    }

    const deleteItem = (item) => {
        
        const reqObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items/${item.id}`,reqObj)
            .then( resp => resp.json() )
            .then(deletedItem => {
                dispatch({
                    type:'DELETE_PANTRY_ITEM',
                    deletedItem: deletedItem
                })
                alert("Item Deleted")
                }
            ) 
    }



    const dragEnd = (result) =>{
        
        const { destination, source, draggableId} = result
        if (!destination){
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        // grab moved item and update it
        const movedItem = pantryItems.find(item => item.id === parseInt(draggableId))
        movedItem.pantry_category_id = parseInt(destination.droppableId)

        //update Redux
        dispatch({
            type:'UPDATE_PANTRY_ITEM',
            pantryItem: movedItem
        })
        // //update server
        const reqObj = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({pantry_item: movedItem})
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items/${movedItem.id}`,reqObj)
            .then( resp => resp.json() )
            .then(console.log)
            .catch(error => {
                console.log(error)
                alert("there was an error")})
    }

    return (
        <Container fluid ='lg' >
            <h2>Your Pantry</h2>
            <Row>
                <Col md={10}>
                    <Row>
                        {/* <Col md ={10}> */}

                    <CardColumns>
                        <DragDropContext onDragEnd={dragEnd}>
                            {pantryCats.map(category =><PantryCatCard key= {category.id} category ={category} clickAction={deleteItem} />)}
                        </DragDropContext>

                    </CardColumns>
                        {/* </Col> */}
                    </Row>
                </Col>

                <Col md={2}>
                    <Card >
                        <Card.Body>
                            <Card.Title onClick={()=>setShowForm(!showForm)}>
                                Add New Category
                            </Card.Title>
                            {showForm?<NewCategoryForm />:null}
                        </Card.Body>
                        
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default PantryPage
