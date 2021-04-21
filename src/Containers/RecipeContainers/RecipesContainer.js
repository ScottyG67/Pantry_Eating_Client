import {Container, Row, Col , Modal, Button} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'

import RecipesSearchContainer from './RecipeSearchContainer'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import {ConfirmDelete, ConfirmSave} from '../../components/PopupMessages'
// import 'ConfirmDelete' from '../../components/ConfirmDelete'

const Recipes = () => {

    const savedRecipes = useSelector(state => state.savedRecipes) //saved
    const filterBy = useSelector(state => state.filterBy)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')
    const [filteredRecipes,setFilteredRecipes] = useState([])

    const [show, setShow] = useState(false);
    const [recipe,setRecipe] = useState({})
  
    const dispatch = useDispatch()

    useEffect( ()=>{
        if(userId !== ""){
            loadSavedRecipes()
        }
    },[userId])

    useEffect(()=>{
        if(filterBy.length > 0){
            console.log(savedRecipes)
            let filteredList =savedRecipes.map(item => item)
            
            filterBy.forEach(filterIng => {
                filteredList = filteredList.filter(recipe => recipe.ingredients.some(ing => ing.foodId === filterIng.ext_id))
            })
            setFilteredRecipes(filteredList)
        }
    },[filterBy])
    
    const handleShow = (recipe) => {
        setShow(true);
        setRecipe(recipe)
    }
    const handleClose = () => {
        setShow(false);
        setRecipe({})
    }

    const deleteRecipe = () => {
        const reqObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/recipes/${recipe.id}`,reqObj)
            .then( resp => resp.json() )
            .then(deletedRecipe => {
                dispatch({
                    type:'DELETE_RECIPE',
                    deletedRecipe: deletedRecipe
                })
                handleClose()
                }
            ) 
    }

    const loadSavedRecipes = () => {

        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            } 
        }
        fetch(`${BASE_URL}/api/v1/users/${userId}/recipes`,reqObj)
            .then( resp => resp.json() )
            .then(recipes => {dispatch({
                    type:'SET_SAVED_RECIPES',
                    savedRecipes: recipes
                })
                }
            )
            .catch(error => {
              console.log(error)
              alert("there was an error")})
    }

    const renderFilterOrAll = () => {
        if(filterBy.length > 0){
            return filteredRecipes.map(recipe => <RecipeCard key = {recipe.id} recipe={recipe}  clickAction = {handleShow} btnTxt={'Delete'}/>)
        }
        return savedRecipes.map(recipe => <RecipeCard key = {recipe.id} recipe={recipe}  clickAction = {handleShow} btnTxt={'Delete'}/>)
    }

    return(
        <div id="content">
            <ConfirmDelete show ={show} handleClose ={handleClose} deleteObject={deleteRecipe} />
            <Row>
                <RecipesSearchContainer />
            </Row>
            <Row>
                {userId!==""?<Col>
                    <h1>Your Recipes</h1>
                    <div class = "flex-grid">
                        {renderFilterOrAll()}
                        {/* {filteredRecipes.map(recipe => <RecipeCard key = {recipe.id} recipe={recipe}  clickAction = {handleShow} btnTxt={'Delete'}/>)} */}
                    </div>
                </Col>:null}
            </Row>
        </div>
    )
}

export default Recipes