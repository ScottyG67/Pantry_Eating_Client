import './main.css'
import {Row, Col, Container} from 'react-bootstrap'

import APIPantrySearch from './PantrySidbarContainers/PantrySearchContainer'
import UserPantry from './PantrySidbarContainers/UserPantryContainer'
import RecipesContainer from './RecipeContainers/RecipesContainer'
import PantryPage from './PantryPageContiners/PantryPage'

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

  const getWrapperClassName = () => {
    if(menuOpen){
      return "content_wrapper_open"
    } else {
      return "content_wrapper_closed"
    }
  }


  
    return (
      <div class = 'wrapper'>
        <div class='row' >
            <div class="col align-self-start">
                <UserPantry toggleMenu={toggleMenu}/>
            </div>
            <div className={getWrapperClassName()}>
                  <RecipesContainer />
            </div>
          </div> 
      </div>

    )
  }
  
  export default Main;