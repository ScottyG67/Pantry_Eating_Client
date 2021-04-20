import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Col, Container, Row, CardColumns, Card} from 'react-bootstrap'
import {FolderPlus} from 'react-bootstrap-icons'
import { DragDropContext} from 'react-beautiful-dnd';

// import PantryItemCard from '../components/PantryItems/PantryItemCard'
// import PantryItemListElement from '../components/PantryItems/PantryItemListElement'

import PantryCatCard from '../../components/PantryCategory/PantryCatCard'
import NewCategoryForm from '../../components/NewCategoryForm'
import ConfirmDelete from '../../components/ConfirmDelete'


const PantryPage = ({history}) => {

    const loggedIn = useSelector(state => state.loggedIn)
  
    useEffect(()=>{
      if(!loggedIn){
        history.push('/')
      }
    })
    
    const pantryCats = useSelector(state => state.pantryCats)
    const pantryItems = useSelector(state => state.pantryItems)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')

    const [showForm, setShowForm] = useState(false)
    const [show, setShow] = useState(false);
    const [item,setItem] = useState({})
    
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

    const handleShowWarning = (item) => {
        setShow(true);
        setItem(item)
    }
    const handleCloseWarning = () => {
        setShow(false);
        setItem({})
    }

    const deleteItem = () => {
        
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
                handleCloseWarning()
                }
            )
            .catch(error => {
                console.log(error)
                alert("There was an error")
            })
    }



    const dragEnd = (result) =>{
        
        const { destination, source, draggableId} = result
        if (!destination){
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        // grab moved item and destination category and source category
        const movedItem = pantryItems.find(item => item.id === parseInt(draggableId))
        let workingPantryItems = pantryItems.filter(item => item.id !== parseInt(draggableId))
        let destCatList = workingPantryItems.filter(item=> item.pantry_category_id == destination.droppableId)
        
        // update Cat ID
        movedItem.pantry_category_id = parseInt(destination.droppableId)
        // update destination category list
        destCatList.splice(destination.index,0,movedItem)
        // remove item and destination category from pantry 
        let newPantryItems = workingPantryItems.filter(item => item.pantry_category_id !== parseInt(destination.droppableId))

        // add destination category with moved item back
        newPantryItems.push(...destCatList)

        dispatch({
            type:'SET_PANTRY_ITEMS',
            pantryItems: newPantryItems
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
    }

    return (
        <Container fluid ='lg' >
            <ConfirmDelete show ={show} handleClose ={handleCloseWarning} deleteObject={deleteItem} />
            <h2>Your Pantry</h2>
            <Row>
                <Col md={10}>
                    <Row>
                        {/* <Col md ={10}> */}

                    <CardColumns>
                        <DragDropContext onDragEnd={dragEnd}>
                            {pantryCats.map(category =><PantryCatCard key= {category.id} category ={category} clickAction={handleShowWarning} />)}
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
