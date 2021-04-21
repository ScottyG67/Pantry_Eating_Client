import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Row,Col} from 'react-bootstrap'
import { DragDropContext} from 'react-beautiful-dnd';

import PantryCategoryContainer from './PantryCategoryContainer'
import {ConfirmDelete, ConfirmSave} from '../../components/PopupMessages'


const PantrySidebar = () => {
    const pantryCats = useSelector(state => state.pantryCats)
    const pantryItems = useSelector(state => state.pantryItems)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false);
    const [item,setItem] = useState({})


    const dispatch = useDispatch()


    const handleShow = (item) => {
        setShow(true);
        setItem(item)
        
    }
    const handleClose = () => {
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
                console.log(deletedItem)
                dispatch({
                    type:'DELETE_PANTRY_ITEM',
                    deletedItem: deletedItem
                })
                handleClose()
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
        <>
            <ConfirmDelete show ={show} handleClose ={handleClose} deleteObject={deleteItem} />
            <div class='sidebar-header'>
                <h2>Your Pantry</h2>
            </div>
            <div>
                <DragDropContext onDragEnd={dragEnd}>
                    <ListGroup>
                        {pantryCats.map(category => <PantryCategoryContainer key= {category.id} category ={category} clickAction={handleShow}/>)}
                    </ListGroup>
                </DragDropContext>
            </div>
        </>
    )
}

export default PantrySidebar