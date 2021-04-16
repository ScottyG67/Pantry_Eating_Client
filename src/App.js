
import './App.css';
import {Navbar, NavDropdown, Form, Button, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { 
  BrowserRouter as Router, 
  Route, 
  Redirect,
  Switch
} from 'react-router-dom';

// import Main from './containers/Main'
import Main from './containers/Main'
// import RecipesContainer from './containers/RecipeContainers/RecipesContainer'
// import Pantry from './containers/PantrySearchContainer'
// import UserPantry from './containers/PantryContainers/UserPantryContainer'
import LoginPage from "./containers/LoginPage"
import Logout from './components/Logout'
import BasicLoginForm from './components/BasicLoginForm'


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

  const renderNotLoggedIn = () => {

  }

  return (
    <div className="App">
      <Navbar bg = 'light' expand = 'lg' fixed="top">
        <Navbar.Brand>Pantry Eating</Navbar.Brand>
        {loggedIn? <Logout className="mr-sm-2"/>:showLoginForm?<BasicLoginForm />:<Button onClick={()=>{setShowLoginForm(!showLoginForm)}} className="mr-sm-2">Login</Button>}
        {loggedIn?null:showLoginPage?null:<Button onClick={()=>{setShowLoginPage(!showLoginPage)}} >SignUp</Button>}
      </Navbar>
      <Router>
          <Switch>
            <Route exact path ='/'>
              <Main />
              {/* {loggedIn? <Main />:<Redirect to='/login' />} */}
            </Route>
            <Route exact path ='/login'>
              {loggedIn? <Redirect to='/' /> :<LoginPage />}
            </Route>
            <Route exact path ='/signup'>
              {loggedIn? <Redirect to='/' /> :<LoginPage />}
            </Route>
            <Route exact path ='/my_pantry'>

            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
