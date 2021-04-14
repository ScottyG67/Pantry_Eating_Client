import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem, Collapse} from 'react-bootstrap'
import PantryItemListElement from '../components/PantryItems/PantryItemListElement'
import {useState} from 'react'

const PantryCategoryContainer = ({category,clickAction}) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <ListGroup.Item variant ='primary' onClick ={()=> setOpen(!open)}>{category.name}</ListGroup.Item>
            <Collapse in={open}>
                <ListGroup>
                    {category.pantry_items.map(item=> <PantryItemListElement key = {item.id} item = {item} clickAction={clickAction} btnTxt={"View"} />)}
                </ListGroup>
            </Collapse>
        </>

    )
}

export default PantryCategoryContainer