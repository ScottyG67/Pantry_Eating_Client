import {Card, ListGroup} from 'react-bootstrap'


const RecipeCardBasicView = ({recipe}) => {

    return (
        <Card.Body>
            <Card.Title>{recipe.label}</Card.Title>
            <ListGroup variant="flush">
            {recipe.totalTime==0?(<ListGroup.Item>Total Time: See Recipe for details</ListGroup.Item>):
                (<ListGroup.Item>Total Time: {recipe.totalTime} min</ListGroup.Item>)}
                <ListGroup.Item>Feeds: {recipe.yield}</ListGroup.Item>
                <ListGroup.Item>Calories: {Math.floor(recipe.calories)}</ListGroup.Item>
            </ListGroup>
            <Card.Link href={recipe.url} target="_blank">Recipe from {recipe.source}</Card.Link>
        </Card.Body>

    )
}
export default RecipeCardBasicView