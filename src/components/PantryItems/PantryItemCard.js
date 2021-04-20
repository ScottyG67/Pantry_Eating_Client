import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { AlignMiddle } from 'react-bootstrap-icons'

const PantryItemCard = ({item,clickAction, btnTxt}) => {

    const {image,name} = item

    return (
        
            // <Col style ={{padding: '10px'}}>
                <Container style={{padding: '10px'}}>
                    <Card style={{ 'width': '10rem'}}>
                        <Card.Img variant="top" src={image} alt={name} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                        </Card.Body>
                        <Button onClick ={()=>{clickAction(item)}}>{btnTxt}</Button>
                    </Card>
                </Container>
            // </Col>


    )
}

export default PantryItemCard