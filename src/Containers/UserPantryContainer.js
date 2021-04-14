import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {Container, Row, Col, CardDeck, Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {FolderPlus} from 'react-bootstrap-icons'

import PantryItemCard from '../components/PantryItems/PantryItemCard'
import PantryItemListElement from '../components/PantryItems/PantryItemListElement'
import PantryCategoryContainer from './PantryCategoryContainer'
import NewCategoryForm from '../components/newCategoryForm'

const UserPantry = () => {
    const pantry = useSelector(state => state.pantry)
    const pantryItems = useSelector(state => state.pantryItems)
    const pantryCats = useSelector(state => state.pantryCats)
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


    return (
        <div className="sidebar">
            <h2>Your Pantry</h2>
            <div>
                <ListGroup>
                    {pantry.map(category => <PantryCategoryContainer key= {category.id} category ={category} clickAction={deleteItem}/>)}
                    {newCatForm?<NewCategoryForm/>:<ListGroup.Item action variant="dark" onClick = {toggleShowForm}> <FolderPlus/>   Add Another Category</ListGroup.Item>}
                    <ListGroup.Item action variant="dark">Add New Item</ListGroup.Item>
                </ListGroup>
                {/* <ListGroup>
                    {pantryItems.map(item=> <PantryItemListElement key = {item.id} item = {item} clickAction={deleteItem} btnTxt={"View"} />)}
                    <ListGroup.Item action variant="dark">Add New Item</ListGroup.Item>
                </ListGroup> */}
            </div>
        </div>
    )
}

export default UserPantry
