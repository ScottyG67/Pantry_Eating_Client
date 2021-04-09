import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

//Components
import Login from '../components/Login'
import SignUp from '../components/SignUp'

function LoginPage() {
    
    return (
        <Container >
            <Row>
                <Col>
                    <Login />
                </Col>
                <Col>
                    <SignUp />
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPage