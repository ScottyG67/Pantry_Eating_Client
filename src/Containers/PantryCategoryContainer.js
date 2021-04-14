import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import PantryItemListElement from '../components/PantryItems/PantryItemListElement'

const PantryCategoryContainer = ({category,clickAction}) => {

    return (
        <>
            <ListGroup.Item variant ='primary'>{category.name}</ListGroup.Item>
            <ListGroup>
                {category.pantry_items.map(item=> <PantryItemListElement key = {item.id} item = {item} clickAction={clickAction} btnTxt={"View"} />)}
            </ListGroup>
        </>

    )
}

export default PantryCategoryContainer