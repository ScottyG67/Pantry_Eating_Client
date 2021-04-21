
import {Card,Row,Col,ListGroup} from 'react-bootstrap'

const About = () => {
    return (
        <>
            <h1>Pantry Eating</h1>
            <Row>
            <Col>
                <h3>Designed and built by</h3>
                <Card bsPrefix='about-card'>
                    <Card.Body>
                    <Card.Title>Scott Gloyna</Card.Title>
                    <Card.Text>I am a full stack software engineer graduating from <a href='https://flatironschool.com/'>FlatIron School</a>. I chose to become a software engineer because I love making things, solving problems and the most enjoyable work I have done during my career was supporting the development and rollout of a new software solution.</Card.Text>
                    <Card.Text>I have 12 years of experience as a mechanical engineer working in a variety of industries and as a consultant. I am a certified project manager and have worked as a manager in high growth environments.</Card.Text>
                    </Card.Body>
                    <Card.Img bsPrefix='about-img' src= "https://media-exp1.licdn.com/dms/image/C4D03AQHB91ltffZGRw/profile-displayphoto-shrink_800_800/0/1516529962541?e=1624492800&v=beta&t=g-MP1pjIDnInO3CGjstC61qwOT6D_S2GC45FT9tB1oU"/>
                </Card>
            </Col>
            <Col>
                <h3>The tech behind Pantry Eating</h3>
                <Card bsPrefix='about-card'>
                    <Card.Text>Pantry Eating is my Software Engineering capstone project for FlatIron School. It was built in two and a half weeks and incorporates the following technologies and techniques:</Card.Text>
                    <Row>
                        <Col>
                            <ul>
                                <li>Ruby On Rails as an API for the backend</li>
                                <li>Authentication using ByCrypt and JWT</li>
                                <li>PostgreSQL database</li>
                                <li>API Integration with Edamam for recipes and ingredients </li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                <li>React frontend with only functional components</li>
                                <li>Redux state</li>
                                <li>Client side routing using React Router</li>
                                <li>Drag and Drop functionality using React Beautiful DnD </li>
                                <li>React Bootstrap, and custom CSS styling</li>
                            </ul>
                        </Col>
                    </Row>
 
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default About