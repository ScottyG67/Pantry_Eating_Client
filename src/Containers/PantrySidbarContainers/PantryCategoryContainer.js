import {useEffect} from 'react'
import {Droppable} from 'react-beautiful-dnd';
import {ListGroup, Accordion} from 'react-bootstrap'

import PantryItemListElement from '../../components/PantryItems/PantryItemListElement'



const PantryCategoryContainer = ({category,clickAction}) => {
    useEffect( ()=>{console.log("pantry category container")})

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={ListGroup.Item} eventKey="0" variant ='primary'>{category.name}</Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Droppable droppableId={category.id.toString()}>
                        {(provided) => (
                            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                                {category.pantry_items.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} clickAction={clickAction} index={index} />)}
                                {provided.placeholder}
                            </ListGroup>
                        )}
                    </Droppable>
                </Accordion.Collapse>
        </Accordion>

    )
}

export default PantryCategoryContainer