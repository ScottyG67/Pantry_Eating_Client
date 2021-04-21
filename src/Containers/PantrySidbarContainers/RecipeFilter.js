import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import {ListGroup, Row,Col, Form, Button} from 'react-bootstrap'
import {XSquare,X} from 'react-bootstrap-icons'
import {Droppable} from 'react-beautiful-dnd';

import PantryItemListElement from '../../components/PantryItems/PantryItemListElement'

const RecipeFilter = () => {
    const pantryItems = useSelector(state => state.pantryItems)
    const filterList = useSelector(state => state.filterBy)
    const [placeHolder, setPlaceHolder] = useState()
    const itemOptions = pantryItems.filter(item => !filterList.includes(item))

    const dispatch = useDispatch()

    const filter = (e) => {
        e.preventDefault()
        e.target.reset()
        const item = pantryItems.find(item => item.id === placeHolder)
        dispatch ({
            type:'ADD_TO_FILTER',
            filterItem:item
        })
    }
    const addToList = (e) => { 
        setPlaceHolder(parseInt(e.target.selectedOptions[0].id))
    }

    const removeFromList = (item) => {
        dispatch ({
            type:'REMOVE_FROM_FILTER',
            filterItem: item
        })
    }


    return(
        <Col>
            <Row>
            <h2>Show Recipes that include these Ingredients</h2>
            <Form onSubmit = {filter} style={{padding: '10%'}}>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    {/* <Form.Label>Add Ingredients</Form.Label> */}
                    <Form.Control as="select" onChange = {addToList}>
                        <option>Select An Item</option>
                        {itemOptions.map(item=> <option id = {item.id}>{item.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Add</Button>
            </Form>
            <ListGroup>
                {filterList.map((item,index)=>  <div>
                    <div className='pantry_list_item'>
                        {item.name}
                        <XSquare className={'delete_symbol'} onClick = {()=>removeFromList(item)}/>
                    </div>
                </div>)}
            </ListGroup>
            </Row>

            {/* <Row>
                <h2>Drop Zone</h2>
            <Droppable droppableId={"filter"}>
                {(provided) => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                        {filterList.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} index={index} />)}
                        {provided.placeholder}
                    </ListGroup>
                )}
            </Droppable>
            </Row> */}
        </Col>
    )

}

export default RecipeFilter