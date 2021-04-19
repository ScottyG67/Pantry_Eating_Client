
import {Container, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {useState} from 'react'


import RecipesSearchForm from '../../components/RecipesSearchForm'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import SignInPopup from '../SignInPopup'

const RecipesSearchContainer = () => {

    const searchRecipes = useSelector(state => state.searchRecipes).map(recipe => recipe) //search
    const BASE_URL = useSelector(state => state.BASE_URL)
    const loggedIn = useSelector(state => state.loggedIn)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const [showPopup, setShowPopup] = useState(false)

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

    const handleClose = () => {
        setShowPopup(false)
    }

    const handleShow = () => {
        setShowPopup(true)
    }

    return(

            <Container>
                <Row>
                    <Col>
                        <RecipesSearchForm />
                        <div class = "flex-grid">
                            {searchRecipes.map(recipe => <RecipeCard recipe={recipe.recipe}  clickAction = {loggedIn?saveRecipe:handleShow} btnTxt={loggedIn?'Save':'Sign in'}/>)}
                        </div>
                    </Col>
                </Row>
                <SignInPopup show ={showPopup} handleClose ={handleClose}/>
            </Container>

    )
}

export default RecipesSearchContainer