import {Col, ListGroup} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {HandThumbsUpFill, HandThumbsDownFill} from 'react-bootstrap-icons'

const RecipeCardIngredient = ({ingredient}) => {
    
    const pantry = useSelector(state => state.pantry)
    const pantryItems = pantry.flatMap(cat=> cat.pantry_items)
    
    const renderIngredient = () => {
        if (pantryItems.length>0) {
            return <ListGroup.Item><Col>{ingredient.text} </Col> {pantryItems.some(item => item.ext_id == ingredient.foodId)? <HandThumbsUpFill color="green"/>: <HandThumbsDownFill color="red"/>}</ListGroup.Item>
        }
        return <ListGroup.Item><Col>{ingredient.text} </Col> </ListGroup.Item>
    }
    
// Add Tooltips (Bootstrap has overlay) to explain checkbox and stop sign
    return (
        <>
        {renderIngredient()}
        </>
        
    )
}
export default RecipeCardIngredient