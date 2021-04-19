
import './App.css';
import {Navbar, Nav, Button, ListGroup} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useSelector } from 'react-redux';

// import { 
//   BrowserRouter as Router, 
//   Route, 
//   Redirect,
//   Switch
// } from 'react-router-dom';

import {Router, Route} from 'react-router'
import history from './history'

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
          <Nav.Link onClick={()=>history.push('/')}>Home</Nav.Link>
          <Nav.Link onClick={()=>history.push("/my_pantry")}>My Pantry</Nav.Link>
          <Nav.Link onClick={()=>history.push("/about")}>About Us</Nav.Link>
        </Nav>
        {loggedIn? <Logout className="mr-sm-2"/>:showLoginForm?<BasicLoginForm />:<Button onClick={()=>{setShowLoginForm(!showLoginForm)}} className="mr-sm-2">Login</Button>}
        {loggedIn?null:showLoginPage?null:<Button className="nav-btn-left" onClick={()=>history.push('/signup')} >SignUp</Button>}
      </Navbar>
      <Router history={history}>
          
            <Route exact path ='/' component={(props)=><Public {...props}/> } />
            <Route exact path = '/home' component={(props)=><Main {...props}/> } />
            <Route exact path ='/login' component={(props)=><LoginPage {...props}/> } />
            <Route exact path ='/signup' component={(props)=><LoginPage {...props}/> } />
            <Route exact path ='/my_pantry' component={(props)=><PantryPage {...props}/> } />
            <Route exact path =  '/about'>
              <About />
            </Route>

          
      </Router>
    </div>
  );
}

export default App;
