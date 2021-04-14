import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap'

const PantryItemCard = ({item,clickAction, btnTxt}) => {

    const {image,name} = item

    return (
        <Col style ={{padding: '10px'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} alt={name} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
                <Button onClick ={()=>{clickAction(item)}}>{btnTxt}</Button>
            </Card>
        </Col>

    )
}

export default PantryItemCard