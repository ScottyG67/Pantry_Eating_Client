
import './App.css';
import {Navbar, Nav, Button, NavDropdown, ListGroup} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';

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
import {ConfirmAccountDelete,AccountDeletedConf} from './components/PopupMessages'




function App() {
  const userId = useSelector(state => state.userId)
  const loggedIn = useSelector(state => state.loggedIn)
  const [showLoginForm,setShowLoginForm] = useState(false)
  const [showLoginPage,setShowLoginPage] = useState(false)
  const token = localStorage.getItem('token')
  const BASE_URL = useSelector(state => state.BASE_URL)

  const [showDltWarn, setShowDltWarn] = useState(false);
  const [showAccDltConf, setShowAccDltConf] = useState(false);

  const dispatch = useDispatch()

  useEffect ( ()=> {
    if (token) {
      const reqObj = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        } 
      }
    fetch(`${BASE_URL}/api/v1/profile`,reqObj)
        .then( resp => resp.json() )
        .then(data => {
          console.log(data)
          dispatch({
            type: 'SET_USERNAME',
            username: data.user.username
          })
          dispatch({
            type: 'SET_USER_ID',
            userId: data.user.id
          })
          dispatch({
            type: 'SET_LOGGED_IN',
            loggedIn: true
          })
          history.push('/home')
        })
        .catch()
  }
  },[])

  useEffect( ()=>{
    if (!loggedIn){
      setShowLoginForm(false)
      setShowLoginPage(false)
    } 
  },[loggedIn])
  
  const logout = () => {

    localStorage.removeItem('token')
    dispatch({
        type: 'RESET'
    })
  }
  const handleDltWarnClose = () => {
    setShowDltWarn(false);
  }

  const handleDltConfClose = () => {
    setShowAccDltConf(false);
  }

  const deleteAccount =() => {
    debugger

    const reqObj = {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
  }

  fetch(`${BASE_URL}/api/v1/users/${userId}`,reqObj)
      .then( resp => resp.json() )
      .then(deleteAccount => {
        console.log(deleteAccount)
        setShowAccDltConf(true)
        
        history.push('/')
      })
  }


  return (
    <div className="App">
      <Navbar bg = 'light' expand = 'lg' fixed="top">
        <Navbar.Brand>Pantry Eating</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>history.push('/')}>Home</Nav.Link>
          <Nav.Link onClick={()=>history.push("/my_pantry")}>My Pantry</Nav.Link>
          <Nav.Link onClick={()=>history.push("/about")}>About</Nav.Link>
          {loggedIn?(<NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item onClick ={logout}> Logout</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Reset Password</NavDropdown.Item>
            <NavDropdown.Item onClick ={()=>setShowDltWarn(true)}>Delete Account</NavDropdown.Item>
          </NavDropdown>):null}
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
      <ConfirmAccountDelete show ={showDltWarn} handleClose ={handleDltWarnClose} deleteAccount={deleteAccount} />
      <AccountDeletedConf show ={showAccDltConf} handleClose ={handleDltConfClose} deleteAccount={deleteAccount} />
    </div>
  );
}

export default App;
