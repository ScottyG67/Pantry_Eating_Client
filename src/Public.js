import {Row, Col, Container} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'

import RecipesContainer from './containers/RecipeContainers/RecipesContainer'


const Public = ({history}) => {
  const loggedIn = useSelector(state => state.loggedIn)
  useEffect(()=>{
    if(loggedIn){
      history.push('/home')
    }
  })

    return (
      <>
        <div>
          <h1>Welcome to Pantry Eating</h1>
          <p>Some text about our mission</p>
        </div>
        <Container>
          <Row>
            <Col>
              <RecipesContainer />
            </Col>
          </Row>
        </Container>
      </>

    )
  }
  
  export default Public;