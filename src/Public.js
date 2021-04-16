import {Row, Col, Container} from 'react-bootstrap'

import RecipesContainer from './containers/RecipeContainers/RecipesContainer'


const Public = () => {

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