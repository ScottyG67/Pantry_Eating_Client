import {Row, Col, Container} from 'react-bootstrap'

import APIPantrySearch from './PantrySidbarContainers/PantrySearchContainer'
import UserPantry from './PantrySidbarContainers/UserPantryContainer'
import RecipesContainer from './RecipeContainers/RecipesContainer'
import PantryPage from './PantryPageContiners/PantryPage'

import { useDispatch, useSelector } from 'react-redux';

const Main = () => {

  const loggedIn = useSelector(state => state.loggedIn)
    return (
      <> 

        <Container>
          <Row>
          {loggedIn? <Col>
                      <APIPantrySearch />
                    </Col>:null}
            <Col>
              <RecipesContainer />
            </Col>
          </Row>
        </Container>
        <Col xs={2} id="sidebar-wrapper">
          {loggedIn?<UserPantry />:null}
        </Col>
      </>

    )
  }
  
  export default Main;