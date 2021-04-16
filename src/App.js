
import './App.css';
import {Navbar, Nav, NavDropdown, Form, Button, Col} from 'react-bootstrap'
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
import About from './components/About'


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


  const requireAuth = (nextState, replace, next) => {
    console.log('requireAuth')
    if (!loggedIn) {
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }

  return (
    <div className="App">
      <Navbar bg = 'light' expand = 'lg' fixed="top">
        <Navbar.Brand>Pantry Eating</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {/* <Nav.Link href="/">My Pantry</Nav.Link> */}
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
        {loggedIn? <Logout className="mr-sm-2"/>:showLoginForm?<BasicLoginForm />:<Button onClick={()=>{setShowLoginForm(!showLoginForm)}} className="mr-sm-2">Login</Button>}
        {loggedIn?null:showLoginPage?null:<Button className="nav-btn-left" onClick={()=>{setShowLoginPage(!showLoginPage)}} >SignUp</Button>}
      </Navbar>
      <Router>
          <Switch>
            <Route exact path ='/' component = {Main} onRender = {() => {
              console.log("onRender")
              loggedIn?( <Redirect to ='/about' /> ) : ( <Main /> )
              }} 
            />
              {/* <Main /> */}
              {/* {loggedIn? <Main />:<Redirect to='/login' />} */}
            {/* </Route> */}
            <Route exact path ='/login' component = {LoginPage} onEnter ={console.log}>
              {/* {loggedIn? <Redirect to='/' /> :<LoginPage />} */}
            </Route>
            <Route exact path ='/signup'>
              {loggedIn? <Redirect to='/' /> :<LoginPage />}
            </Route>
            <Route exact path ='/my_pantry'>

            </Route>
            <Route exact path =  '/about'>
              <About />
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
