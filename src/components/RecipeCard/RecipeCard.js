import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'

import RecipeCardIngredients from './RecipeCardIngredients'
import RecipeCardBasicView from './RecipeCardBasicView'


const RecipeCard = ({recipe,clickAction, btnTxt}) => {
    
    const [toggleIngredients, setToggleIngredients] = useState(true)

    const loggedIn = useSelector(state => state.loggedIn)
    const handleClick = (e) => {
        // console.log(recipeData)
        clickAction(recipe)
    }

    return (
        <Col style ={{padding: '10px'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={recipe.image} alt={recipe.label} onClick ={()=>{setToggleIngredients(!toggleIngredients)}}/>
                {toggleIngredients?<RecipeCardBasicView recipe = {recipe}/>:<RecipeCardIngredients recipe={recipe} />}
                {loggedIn?<Button onClick = {()=>clickAction(recipe)}> {btnTxt}</Button>:<Button onClick = {()=> alert("not working yet")}> Sign In </Button>}
            </Card>
        </Col>
    )
}
export default RecipeCard

  