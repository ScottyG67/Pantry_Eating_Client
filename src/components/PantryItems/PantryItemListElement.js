import {Container, Row, Col, Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import {useState} from 'react'
import PantryItemCard from './PantryItemCard'

const PantryItemListElement = ({item,clickAction, btnTxt}) => {
    const [showCard,setShowCard] = useState(false)

    const {image,name} = item

    return (
        <>
            <ListGroup.Item action variant="light" onClick={()=>{setShowCard(!showCard)}}>{name}</ListGroup.Item>
            {showCard?<Container><PantryItemCard key = {item.id} item = {item} clickAction={clickAction} btnTxt={"Delete"}/></Container>:null}
        </>

    )
}

export default PantryItemListElement