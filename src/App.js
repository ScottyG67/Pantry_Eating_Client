
import './App.css';
import {Navbar, NavDropdown, Form, Button, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react'

// import Main from './containers/Main'
import RecipesContainer from './containers/RecipesContainer'
import Pantry from './containers/PantrySearchContainer'
import UserPantry from './containers/UserPantryContainer'
import LoginPage from "./containers/LoginPage"
import Logout from './components/Logout'
import BasicLoginForm from './components/BasicLoginForm'


import { useDispatch, useSelector } from 'react-redux';

function App() {
  const username = useSelector(state => state.username)
  const loggedIn = useSelector(state => state.loggedIn)
  const [showLoginForm,setShowLoginForm] = useState(false)
  const [showLoginPage,setShowLoginPage] = useState(false)

  useEffect( ()=>{
    if (!loggedIn){
      setShowLoginForm(false)
      setShowLoginPage(false)
    }
  },[loggedIn])

  return (
    <div className="App">
      <Navbar bg = 'light' expand = 'lg' fixed="top">
        <Navbar.Brand>Pantry Eating</Navbar.Brand>
        {loggedIn? <Logout className="mr-sm-2"/>:showLoginForm?<BasicLoginForm />:<Button onClick={()=>{setShowLoginForm(!showLoginForm)}} className="mr-sm-2">Login</Button>}
        {loggedIn?null:showLoginPage?null:<Button onClick={()=>{setShowLoginPage(!showLoginPage)}} >SignUp</Button>}
      </Navbar>
      
      {showLoginPage?<LoginPage />:null}
      <Col>
        <RecipesContainer />
        {loggedIn?<Pantry />:null}
      </Col>
      <Col xs={2} id="sidebar-wrapper">
       {loggedIn?<UserPantry />:null}
      </Col>
      

      
      {/* <Main /> */}
    </div>
  );
}

export default App;
