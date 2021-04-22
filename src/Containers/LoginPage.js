import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

//Components
import Login from '../components/Login'
import SignUp from '../components/SignUp'

function LoginPage({history}) {
    
    return (
        <Container >
            <Row>
                <Col>
                    <Login history={history}/>
                </Col>
                <Col>
                    <SignUp history={history}/>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPage