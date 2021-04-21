import './main.css'
import {Row, Col, Container} from 'react-bootstrap'

import UserPantrySidebars from './PantrySidbarContainers/PantrySidebarsContainer'
import RecipesContainer from './RecipeContainers/RecipesContainer'

import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react'


const Main = ({history}) => {

  const loggedIn = useSelector(state => state.loggedIn)
  const [menuOpen,setMenuOpen] = useState(false)

  
  useEffect(()=>{
    if(!loggedIn){
      history.push('/')
    }
  })

  const toggleMenu = () =>{
    setMenuOpen(!menuOpen)
  }

  const getSpacerClassName = () => {
    if(menuOpen){
      return "main_page_spacing_open"
    } else {
      return "main_page_spacing_closed"
    }
  }

    return (
      <>
        <UserPantrySidebars toggleMenu={toggleMenu}/>
        <div className={getSpacerClassName()}>
          <Container fluid>
            <RecipesContainer />
          </Container>
        </div>
      </>
    )
  }
  
  export default Main;