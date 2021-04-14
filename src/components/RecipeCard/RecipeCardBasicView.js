import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap'


const RecipeCardBasicView = ({recipe}) => {

    return (
        <Card.Body>
            <Card.Title>{recipe.label}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Total Time: {recipe.totalTime} min</ListGroup.Item>
                <ListGroup.Item>Feeds: {recipe.yield}</ListGroup.Item>
                <ListGroup.Item>Calories: {recipe.calories}</ListGroup.Item>
            </ListGroup>
            <Card.Link href={recipe.url} target="_blank">Recipe from {recipe.source}</Card.Link>
        </Card.Body>

    )
}
export default RecipeCardBasicView