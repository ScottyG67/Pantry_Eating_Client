import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import RecipeCardIngredient from './RecipeCardIngredient'

const RecipeCardIngredients = ({recipe}) => {
    
    const pantryItems = useSelector(state => state.pantryItems)
    

    return (
                <Card.Body>
                    <Card.Title>{recipe.label}</Card.Title>
                    <ListGroup variant="flush">
                        {recipe.ingredients?recipe.ingredients.map(item => <RecipeCardIngredient ingredient = {item} />):<ListGroupItem>No Ingredients Right Now</ListGroupItem>}
                    </ListGroup>
                </Card.Body>

    )
}
export default RecipeCardIngredients