import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {HandThumbsUpFill, HandThumbsDownFill} from 'react-bootstrap-icons'

const RecipeCardIngredient = ({ingredient}) => {
    
    const pantry = useSelector(state => state.pantry)
    const pantryItems = pantry.map(cat=> cat.pantry_items)
    
// Add Tooltips (Bootstrap has overlay) to explain checkbox and stop sign
    return (
        <ListGroup.Item><Col>{ingredient.text} </Col> {pantryItems[0].some(item => item.ext_id == ingredient.foodId)? <HandThumbsUpFill color="green"/>: <HandThumbsDownFill color="red"/>}</ListGroup.Item>
    )
}
export default RecipeCardIngredient