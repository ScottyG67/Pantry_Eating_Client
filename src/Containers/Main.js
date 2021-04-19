import {Row, Col, Container} from 'react-bootstrap'

import APIPantrySearch from './PantrySidbarContainers/PantrySearchContainer'
import UserPantry from './PantrySidbarContainers/UserPantryContainer'
import RecipesContainer from './RecipeContainers/RecipesContainer'
import PantryPage from './PantryPageContiners/PantryPage'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'


const Main = ({history}) => {

  const loggedIn = useSelector(state => state.loggedIn)
  
  useEffect(()=>{
    if(!loggedIn){
      history.push('/')
    }
  })


  
    return (
      <> 
      <Container>

        <Container>
          <Row>
            <Col id="sidebar-wrapper">
                  <UserPantry />
            </Col>
            <Col>
              <APIPantrySearch />
            </Col>
            <Col>
              <RecipesContainer />
            </Col>
          </Row>
        </Container>
      </Container>
      </>

    )
  }
  
  export default Main;