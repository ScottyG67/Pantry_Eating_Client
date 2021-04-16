import {Col, Card, Button, ListGroup} from 'react-bootstrap'
import {PlusSquare} from 'react-bootstrap-icons'
import {useSelector } from 'react-redux';
import {Droppable} from 'react-beautiful-dnd';
import {useState} from 'react'

import PantryItemListElement from '../PantryItems/PantryItemListElement'
import SimplePantryItemForm from '../SimplePantryItemForm'

const CategoryCard = ({category,clickAction}) => {

    const [showForm, setShowForm] = useState(false)
    
    const toggleShow = () => {
        setShowForm(!showForm)
    }
    return (
        // <Col md={3}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Droppable droppableId={category.id.toString()}>
                        {(provided) => (
                            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                                {category.pantry_items.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} clickAction={clickAction} index={index} />)}
                                {provided.placeholder}
                                {showForm?<ListGroup.Item onClick = {toggleShow}> <SimplePantryItemForm toggleShow ={toggleShow}/>  </ListGroup.Item>: null}
                            </ListGroup>
                        )}
                    </Droppable>
                    {showForm?null:<PlusSquare onClick = {toggleShow}/>}
                </Card.Body>
                
            </Card>
        // </Col>
    )
}
export default CategoryCard