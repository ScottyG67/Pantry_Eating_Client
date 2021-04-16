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
    const pantry = useSelector(state => state.pantry)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')

    const [showForm, setShowForm] = useState(false)
    
    const dispatch = useDispatch()

    useEffect( ()=>{
        if(userId !== ""){
            getPantry()
        }
    },[userId])

    const getPantry = () => {
        
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
                console.log(deletedItem)
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

        let updatedPantry = pantry.map(cat => cat)

        // grab moved item and source list
        const sourceCat = updatedPantry.find(cat=> cat.id == source.droppableId)
        const sourceIndex = updatedPantry.findIndex(cat=> cat.id == source.droppableId)
        let sourceItemList = sourceCat.pantry_items.map(item=> item)
        const movedItem = sourceCat.pantry_items.find( item => item.id == draggableId)
        

        // Remove Item from original location
        sourceItemList.splice(source.index,1)
        updatedPantry[sourceIndex].pantry_items = sourceItemList

        // grab destination list (done after removal)
        const destCat = updatedPantry.find(cat=> cat.id == destination.droppableId)
        const destCatIndex = updatedPantry.findIndex(cat=> cat.id == destination.droppableId)
        let destItemList = destCat.pantry_items.map(item=> item)

        // Add item to new location
        destItemList.splice(destination.index,0,movedItem)
        updatedPantry[destCatIndex].pantry_items = destItemList

        //update Redux
        dispatch({
            type:'SET_PANTRY',
            pantry: pantry
        })

        //update server
        

        const reqObj = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({pantry_item: movedItem, category_id:destCat.id})
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items/${movedItem.id}`,reqObj)
            .then( resp => resp.json() )
            .then(console.log) 
        

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
                            {pantry.map(category =><PantryCatCard key= {category.id} category ={category} clickAction={deleteItem} />)}
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
