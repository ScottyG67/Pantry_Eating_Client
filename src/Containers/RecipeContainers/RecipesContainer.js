import {Container, Row, Col , Modal, Button} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'

import RecipesSearchContainer from './RecipeSearchContainer'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import ConfirmDelete from '../../components/ConfirmDelete'

const Recipes = () => {

    const savedRecipes = useSelector(state => state.savedRecipes) //saved
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false);
    const [recipe,setRecipe] = useState({})
  
    


    const dispatch = useDispatch()

    useEffect( ()=>{
        if(userId !== ""){
            loadSavedRecipes()
        }
    },[userId])
    
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

    return(
        <div>
            <ConfirmDelete show ={show} handleClose ={handleClose} deleteObject={deleteRecipe} />
            <Container>
                <Row>
                    <RecipesSearchContainer />
                    {userId!==""?<Col>
                        <h1>Your Recipes</h1>
                        <div class = "flex-grid">
                            {savedRecipes.map(recipe => <RecipeCard key = {recipe.id} recipe={recipe}  clickAction = {handleShow} btnTxt={'Delete'}/>)}
                        </div>
                    </Col>:null}
                </Row>
            </Container>
        </div>
    )
}

export default Recipes