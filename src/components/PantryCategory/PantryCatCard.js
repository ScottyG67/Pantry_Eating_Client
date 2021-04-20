import {Col, Card, Button, ListGroup, Carousel} from 'react-bootstrap'
import {PlusSquare} from 'react-bootstrap-icons'
import {useDispatch, useSelector } from 'react-redux';
import {Droppable} from 'react-beautiful-dnd';
import {useState} from 'react'
import PantryItemListElement from '../PantryItems/PantryItemListElement'
import SimplePantryItemForm from '../SimplePantryItemForm'
import PantryItemCard from '../PantryItems/PantryItemCard'
import {ConfirmSaved} from '../../components/PopupMessages'

const CategoryCard = ({category,clickAction}) => {

    const pantryItems = useSelector(state => state.pantryItems).filter(item => item.pantry_category_id === category.id)
    const itemSearchResults = useSelector(state => state.itemSearchResults)
    const BASE_URL = useSelector(state => state.BASE_URL)
    const userId = useSelector(state => state.userId)
    const token = localStorage.getItem('token')

    const [showForm, setShowForm] = useState(false)
    const [showSearchRes, setShowSearchRes] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    

    const toggleShowForm = () => { setShowForm(!showForm) }
    const toggleShowRes = () => { setShowSearchRes(!showSearchRes)}
    const dispatch = useDispatch()


    const saveItem = (item) => {
        console.log(`saving ${item}`)

        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({pantry_item: item, category_id: category.id})
        }

        fetch(`${BASE_URL}/api/v1/users/${userId}/pantry_items`,reqObj)
            .then( resp => resp.json() )
            .then(savedItem => {
                console.log(savedItem)
                setShowPopup(true)
                dispatch({
                    type:'SAVE_PANTRY_ITEM',
                    pantryItem: savedItem
                })
                dispatch({
                    type:'SET_ITEM_SEARCH_RESULTS',
                    itemSearchResults: []
                })
            })
            .catch(error => {
              console.log(error)
            //   alert("there was an error")
            })
    }

    const handlePopupClose = () =>{
        setShowPopup(false)
    }

    return (
        <>
            <ConfirmSaved show ={showPopup} handleClose ={handlePopupClose}/>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Droppable droppableId={category.id.toString()}>
                        {(provided) => (
                            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                                {pantryItems.map((item,index)=> <PantryItemListElement key = {item.id} item = {item} clickAction={clickAction} index={index} />)}
                                {provided.placeholder}
                                {showForm?<ListGroup.Item > <SimplePantryItemForm toggleShowForm ={toggleShowForm} toggleShowRes = {toggleShowRes} clickAction ={saveItem}/>  </ListGroup.Item>: null}
                            </ListGroup>
                        )}
                    </Droppable>
                    {showForm?null:<PlusSquare onClick = {toggleShowForm}/>}
                </Card.Body>
                {showSearchRes?<Carousel>{itemSearchResults.map(item => <Carousel.Item><PantryItemCard item = {item} clickAction ={saveItem}  btnTxt = {'save'} /></Carousel.Item>)}</Carousel>:null}
            </Card>
        </>
    )
}
export default CategoryCard