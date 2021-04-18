import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import {ListGroup} from 'react-bootstrap'
import {FolderPlus} from 'react-bootstrap-icons'
import { DragDropContext} from 'react-beautiful-dnd';

import PantryCategoryContainer from './PantryCategoryContainer'
import NewCategoryForm from '../../components/NewCategoryForm'


const UserPantry = () => {
    const pantryCats = useSelector(state => state.pantryCats)
    const pantryItems = useSelector(state => state.pantryItems)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')
    
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
        // fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
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
                console.log(deletedItem)
                dispatch({
                    type:'DELETE_PANTRY_ITEM',
                    deletedItem: deletedItem
                })
                alert("Item Deleted")
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

        // grab moved item and source list
        const movedItem = pantryItems.find(item => item.id === parseInt(draggableId))
        // update Cat ID
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
        

    }

    return (
        <div className="sidebar">
            <h2>Your Pantry</h2>
            <div>
            <DragDropContext onDragEnd={dragEnd}>
                <ListGroup>
                    {pantryCats.map(category => <PantryCategoryContainer key= {category.id} category ={category} clickAction={deleteItem}/>)}
                    {newCatForm?<NewCategoryForm/>:<ListGroup.Item action variant="dark" onClick = {toggleShowForm}> <FolderPlus/>   Add Another Category</ListGroup.Item>}
                    <ListGroup.Item action variant="dark">Add New Item</ListGroup.Item>
                </ListGroup>
            </DragDropContext>
            </div>
        </div>
    )
}

export default UserPantry
