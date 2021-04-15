import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {Container, Row, Col, CardDeck, Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {FolderPlus} from 'react-bootstrap-icons'
import { DragDropContext} from 'react-beautiful-dnd';

// import PantryItemCard from '../components/PantryItems/PantryItemCard'
// import PantryItemListElement from '../components/PantryItems/PantryItemListElement'
import PantryCategoryContainer from './PantryCategoryContainer'
import NewCategoryForm from '../components/newCategoryForm'

const UserPantry = () => {
    const pantry = useSelector(state => state.pantry)
    // const pantryItems = useSelector(state => state.pantryItems)
    // const pantryCats = useSelector(state => state.pantryCats)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')
    


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
        // fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
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

    const newCat = () => {
        debugger

        const catName = "New Category"

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({catName: catName})
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_categories`,reqObj)
            .then( resp => resp.json() )
            .then(newCategory => {
                dispatch({
                    type:'NEW_CATEGORY',
                    newCategory: newCategory
                })
                }
            ) 
    }

    const toggleShowForm =() =>{
        dispatch({
            type:'TOGGLE_SHOW_CATEGORY_FORM',
            showCategoryForm: !newCatForm
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
        <div className="sidebar">
            <h2>Your Pantry</h2>
            <div>
            <DragDropContext onDragEnd={dragEnd}>
                <ListGroup>
                    {pantry.map(category => <PantryCategoryContainer key= {category.id} category ={category} clickAction={deleteItem}/>)}
                    {newCatForm?<NewCategoryForm/>:<ListGroup.Item action variant="dark" onClick = {toggleShowForm}> <FolderPlus/>   Add Another Category</ListGroup.Item>}
                    <ListGroup.Item action variant="dark">Add New Item</ListGroup.Item>
                </ListGroup>
            </DragDropContext>
            </div>
        </div>
    )
}

export default UserPantry
