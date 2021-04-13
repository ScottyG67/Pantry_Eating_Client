import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap'

const PantryItemCard = ({item,clickAction, btnTxt}) => {
    // debugger

    const {image,name} = item

    // if(item.food){
    //     var image = item.food.image
    //     var name = item.food.name
    // } else {
    //     var image = item.image
    //     var name = item.name
    // }

    const handleClick = () => {
        console.log(item)
        clickAction(item)
    }

    return (
        <Col style ={{padding: '10px'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} alt={name} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
                <Button onClick ={handleClick}>{btnTxt}</Button>
            </Card>
        </Col>

    )
}

export default PantryItemCard