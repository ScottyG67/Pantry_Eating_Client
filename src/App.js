
import './App.css';

// import Main from './containers/Main'
import RecipesContainer from './containers/RecipesContainer'
import Pantry from './containers/PantryContainer'
import LoginPage from "./containers/LoginPage"
import Logout from './components/Logout'

import { useDispatch, useSelector } from 'react-redux';

function App() {
  const username = useSelector(state => state.username)
  const loggedIn = useSelector(state => state.loggedIn)
  return (
    <div className="App">
      <h1>Pantry Eating</h1>
      {loggedIn? <Logout />:null}
      {loggedIn? null:<LoginPage />}
      <RecipesContainer />
      {loggedIn?<Pantry />:null}

      
      {/* <Main /> */}
    </div>
  );
}

export default App;
