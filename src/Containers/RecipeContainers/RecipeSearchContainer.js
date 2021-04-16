
import {Container, Row, Col, Button, CardDeck, Card} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'


import RecipesSearchForm from '../../components/RecipesSearchForm'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

const RecipesSearchContainer = () => {

    const searchRecipes = useSelector(state => state.searchRecipes).map(recipe => recipe) //search
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const dispatch = useDispatch()

    
    const saveRecipe = (recipe) => {


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
                alert("Add Bootstrap Modal")
                }
            )   
    }




    return(

            <Container>
                <Row>
                    <Col>
                        <RecipesSearchForm />
                        
                        <div class = "flex-grid">
                            {searchRecipes.map(recipe => <RecipeCard recipe={recipe.recipe}  clickAction = {saveRecipe} btnTxt={'Save'}/>)}
                        </div>
                    </Col>
                </Row>
            </Container>

    )
}

export default RecipesSearchContainer