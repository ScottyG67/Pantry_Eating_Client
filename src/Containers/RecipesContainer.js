import react from 'react'
import {Container, Row, Col, CardDeck, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'

import RecipesSearchForm from '../components/RecipesSearchForm'
import RecipeCard from '../components/RecipeCard'

const Recipes = () => {

    const searchRecipes = useSelector(state => state.searchRecipes).map(recipe => recipe) //search
    const savedRecipes = useSelector(state => state.savedRecipes) //saved
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const dispatch = useDispatch()

    useEffect( ()=>{
        if(userId !== ""){
            loadSavedRecipes()
        }
    },[userId])
    
    const saveRecipe = (recipe) => {
        // console.log(token)
        // console.log(recipe)

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(recipe)
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/recipes`,reqObj)
            .then( resp => resp.json() )
            .then(savedRecipe => {
                console.log(savedRecipe)
                dispatch({
                    type:'SAVE_RECIPE',
                    savedRecipes: savedRecipe
                })
                alert("Recipe Saved")
                }
            )   
    }

    const deleteRecipe = (recipe) => {
        alert("try again later")
        const reqObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(recipe)
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/recipes/${recipe.id}`,reqObj)
            .then( resp => resp.json() )
            .then(deletedRecipe => {
                console.log(deletedRecipe)
                dispatch({
                    type:'DELETE_RECIPE',
                    deletedRecipe: deletedRecipe
                })
                alert("Recipe Deleted")
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
                    type:'SET_SAVED_RECIPE',
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
            <Container>
                <Row>
                    <Col>
                        <h1>Search Column</h1>
                        <RecipesSearchForm />
                        {/* <CardDeck> */}
                        <div class = "flex-grid">
                            {searchRecipes.map(recipe => <RecipeCard recipe={recipe.recipe}  clickAction = {saveRecipe} btnTxt={'Save'}/>)}
                        </div>
                        {/* {/* </CardDeck> */}
                    </Col>
                    {userId!==""?<Col>
                        <h1>Your Recipes</h1>
                        <div class = "flex-grid">
                            {savedRecipes.map(recipe => <RecipeCard recipe={recipe}  clickAction = {deleteRecipe} btnTxt={'delete - not working'}/>)}
                        </div>
                    </Col>:null}
                </Row>
            </Container>
            

        </div>
    )
}

export default Recipes