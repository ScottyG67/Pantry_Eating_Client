import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Row,Col} from 'react-bootstrap'
import {FileEarmarkEaselFill, FolderPlus} from 'react-bootstrap-icons'
import { DragDropContext} from 'react-beautiful-dnd';

import PantryCategoryContainer from './PantryCategoryContainer'
import NewCategoryForm from '../../components/NewCategoryForm'
import APIPantrySearch from './PantrySearchContainer'
import RecipeFilter from './RecipeFilter'
import {ConfirmDelete, ConfirmSave} from '../../components/PopupMessages'
import PantrySidebar from './PantrySidebar';


const UserPantrySidebars = ({toggleMenu}) => {
    const pantryCats = useSelector(state => state.pantryCats)
    const pantryItems = useSelector(state => state.pantryItems)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const newCatForm = useSelector(state => state.showCategoryForm)
    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false);
    const [item,setItem] = useState({})
    const [showSearch, setShowSearch] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

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

    const toggleShowSearch = () => {
        setShowSearch(!showSearch)
        setShowFilter(false)
        toggleMenu()
    }
    const toggleShowFilter = () => {
        setShowFilter(!showFilter)
        setShowSearch(false)
        toggleMenu()
    }

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
            <div id="sidebar">
                <div>
                    <DragDropContext onDragEnd={dragEnd}>
                        <PantrySidebar pantryCats ={pantryCats}/>
                    </DragDropContext>
                    <ListGroup>
                        {newCatForm?<NewCategoryForm/>:<ListGroup.Item action variant="dark" onClick = {toggleShowForm}> <FolderPlus/>   Add Another Category</ListGroup.Item>}
                        <ListGroup.Item action variant="dark" onClick = {toggleShowSearch}>Add New Item</ListGroup.Item>
                        <ListGroup.Item action variant="dark" onClick = {toggleShowFilter}>Filter Recipes by Ingredients</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
            {showSearch?(<div id ="sidebar_2">
                        <APIPantrySearch />
                    </div>):(null)}
            {showFilter?(<div id ="sidebar_2">
                                <RecipeFilter />
                            </div>):(null)}

           
        </>
    )
}

export default UserPantrySidebars

