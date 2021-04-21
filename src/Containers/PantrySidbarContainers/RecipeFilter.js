import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Row,Col, Form, Button, Container} from 'react-bootstrap'
import {XSquare,X} from 'react-bootstrap-icons'
import {DragDropContext,Droppable} from 'react-beautiful-dnd';

import PantryItemListElement from '../../components/PantryItems/PantryItemListElement'

const RecipeFilter = () => {

    const pantryItems = useSelector(state => state.pantryItems)
    const filterList = useSelector(state => state.filterBy)
    const [placeHolder, setPlaceHolder] = useState()
    const itemOptions = pantryItems.filter(item => !filterList.includes(item))

    const dispatch = useDispatch()


    const dragEnd = (result) =>{
        const { destination, source, draggableId} = result
        if (!destination){
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }
        
        if(destination.droppableId === "filter"){
            const movedItem = itemOptions.find(item => item.id === parseInt(draggableId))
            console.log(`adding ${movedItem}`)
            dispatch ({
                type:'ADD_TO_FILTER',
                filterItem:movedItem
            })
        } else {
            const movedItem = filterList.find(item => item.id === parseInt(draggableId))
            console.log(`removing ${movedItem}`)
            dispatch ({
                type:'REMOVE_FROM_FILTER',
                filterItem: movedItem
            })
        }
    }


    return(
        <Container>
            <DragDropContext onDragEnd={dragEnd}>
                    <Row>
                    <h2>Your Pantry</h2>
                    <Droppable droppableId={"pantry"}>
                        {(provided) => (
                            <ListGroup {...provided.droppableProps} ref={provided.innerRef} bsPrefix='drop_zone'>
                                {itemOptions.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} clickAction={console.log} index={index} />)}
                                {provided.placeholder}
                            </ListGroup>
                        )}
                    </Droppable>
                    </Row>
                    <h2>Show Recipes that include these Ingredients</h2>
                    <Droppable droppableId={"filter"}>
                        {(provided) => (
                            <ListGroup {...provided.droppableProps} ref={provided.innerRef} bsPrefix='drop_zone'>
                                {filterList.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} clickAction={console.log} index={index} />)}
                                {provided.placeholder}
                            </ListGroup>
                        )}
                    </Droppable>
            </DragDropContext>
        </Container>
    )

}

export default RecipeFilter