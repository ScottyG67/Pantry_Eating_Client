
import {Container, Row, Col, CardDeck, Card} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'

import RecipeCard from '../../components/RecipeCard/RecipeCard'

const UserRecipesContainer = () => {

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
    

    const deleteRecipe = (recipe) => {

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
            <Container>
                <Row>
                    {userId!==""?<Col>
                        <h1>Your Recipes</h1>
                        <div class = "flex-grid">
                            {savedRecipes.map(recipe => <RecipeCard key = {recipe.id} recipe={recipe}  clickAction = {deleteRecipe} btnTxt={'Delete'}/>)}
                        </div>
                    </Col>:null}
                </Row>
            </Container>
    )
}

export default UserRecipesContainer