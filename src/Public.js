import {Row, Col, Container} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'

import RecipesContainer from './containers/RecipeContainers/RecipesContainer'


const Public = ({history}) => {
  const loggedIn = useSelector(state => state.loggedIn)
  const image = '../public/conscious-design-AD-8q-1EytA-unsplash.jpg'
  
  useEffect(()=>{

    
    if(loggedIn){
      history.push('/home')
    }
  })

    return (
      <>
        <div>
          <h1>Welcome to Pantry Eating</h1>
          <img id='home-img' src = 'https://images.unsplash.com/photo-1605522362572-0d1418de7d27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80' />
          <p>Eating at home for every meal can be tough and I sympathize with that. The biggest problem is figuring out what to make, and using what you have. Every time you look in your pantry there is a wall of food, yet there is <strong>"nothing to eat"</strong></p>
          <p>I wanted to help so I built Pantry Eating with the goal of connecting what is in the pantry with what can be made.</p>
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