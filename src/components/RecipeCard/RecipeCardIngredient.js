import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

const RecipeCardIngredient = ({ingredient}) => {
    
    const pantryItems = useSelector(state => state.pantryItems)
    
// Add Tooltips (Bootstrap has overlay) to explain checkbox and stop sign
    return (
        <ListGroup.Item>{ingredient.text} {pantryItems.some(item => item.ext_id == ingredient.foodId)? "✅": "🛑"}</ListGroup.Item>
    )
}
export default RecipeCardIngredient