import {Navbar, NavDropdown, Form, Button,Row, Col, Container} from 'react-bootstrap'

import LoginPage from "./LoginPage";
import Logout from '../components/Logout'
import APIPantrySearch from '../containers/PantryContainers/PantrySearchContainer'
import UserPantry from './PantryContainers/UserPantryContainer'
import RecipesContainer from './RecipeContainers/RecipesContainer'

import { useDispatch, useSelector } from 'react-redux';

const Main = () => {

  const loggedIn = useSelector(state => state.loggedIn)
    return (
      <>
        <div>
          <h1>Welcome to Pantry Eating</h1>
          <p>Some text about our mission</p>
        </div>
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