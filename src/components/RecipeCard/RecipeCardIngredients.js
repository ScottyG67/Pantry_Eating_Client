import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import RecipeCardIngredient from './RecipeCardIngredient'

const RecipeCardIngredients = ({recipe}) => {
    

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