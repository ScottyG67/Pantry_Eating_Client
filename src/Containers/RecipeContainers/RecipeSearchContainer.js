
import {Container, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'


import RecipesSearchForm from '../../components/RecipesSearchForm'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import SignInPopup from '../SignInPopup'
import {ConfirmSaved} from '../../components/PopupMessages'

const RecipesSearchContainer = () => {

    const searchRecipes = useSelector(state => state.searchRecipes).map(recipe => recipe) //search
    const filterBy = useSelector(state => state.filterBy)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const loggedIn = useSelector(state => state.loggedIn)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const [filteredRecipes,setFilteredRecipes] = useState([])
    const [ShowLoginPopup, setShowLoginPopup] = useState(false)
    const [ShowSavePopup, setShowSavePopup] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        
        if(filterBy.length > 0){

            let filteredList =searchRecipes.map(item => item)
            
            filterBy.forEach(filterIng => {
                filteredList = filteredList.filter(item => item.recipe.ingredients.some(ing => ing.foodId === filterIng.ext_id))
            })
            setFilteredRecipes(filteredList)
        } 
    },[filterBy])
    
    const saveRecipe = (recipe) => {
        console.log(recipe)

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
                    savedRecipe: savedRecipe
                })
                handleSavePopupShow()
                }
            )   
    }

    const handleSavePopupClose = () => {
        setShowSavePopup(false)
    }

    const handleSavePopupShow = () => {
        setShowSavePopup(true)
    }

    const handleLogInPopupClose = () => {
        setShowLoginPopup(false)
    }

    const handleLoginPopupShow = () => {
        setShowLoginPopup(true)
    }

    const renderFilterOrAll = () => {
        if(filterBy.length > 0){
            return filteredRecipes.map(recipe => <RecipeCard recipe={recipe.recipe}  clickAction = {loggedIn?saveRecipe:handleLogInPopupClose} btnTxt={loggedIn?'Save':'Sign in'}/>)
        }
        return searchRecipes.map(recipe => <RecipeCard recipe={recipe.recipe}  clickAction = {loggedIn?saveRecipe:handleLogInPopupClose} btnTxt={loggedIn?'Save':'Sign in'}/>)
    }

    return(
        <>
            <Container>
                
                <Row>
                    <Col>
                        <RecipesSearchForm />
                        <div class = "flex-grid">
                            {renderFilterOrAll()}
                        </div>
                    </Col>
                </Row>
                <SignInPopup show ={ShowLoginPopup} handleClose ={handleLogInPopupClose}/>
            </Container>
            <ConfirmSaved show ={ShowSavePopup} handleClose ={handleSavePopupClose}/>
        </>
    )
}

export default RecipesSearchContainer