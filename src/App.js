
import './App.css';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useSelector } from 'react-redux';

import { 
  BrowserRouter as Router, 
  Route, 
  Redirect,
  Switch
} from 'react-router-dom';

import Public from './Public'
import Main from './containers/Main'
import LoginPage from "./containers/LoginPage"
import Logout from './components/Logout'
import BasicLoginForm from './components/BasicLoginForm'
import About from './components/About'
import PantryPage from './containers/PantryPageContiners/PantryPage'



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
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/my_pantry">My Pantry</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
        {loggedIn? <Logout className="mr-sm-2"/>:showLoginForm?<BasicLoginForm />:<Button onClick={()=>{setShowLoginForm(!showLoginForm)}} className="mr-sm-2">Login</Button>}
        {loggedIn?null:showLoginPage?null:<Button className="nav-btn-left" onClick={()=>{setShowLoginPage(!showLoginPage)}} >SignUp</Button>}
      </Navbar>
      <Router>
          <Switch>
            <Route exact path ='/' >
              {loggedIn?<Redirect to='/home' /> :<Public />}
            </Route>

            <Route exact path = '/home'>
              {loggedIn? <Main /> : <Redirect to='/'/>}
            </Route>

            <Route exact path ='/signup'>
              {loggedIn? <Redirect to='/' /> :<LoginPage />}
            </Route>

            <Route exact path ='/my_pantry'>
               <PantryPage />
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
