import LoginPage from "./LoginPage";
import Logout from '../components/Logout'

const Main = () => {
    return (
      <div className="App">
        <h1>Hello Main</h1>
        <Logout />
        <LoginPage />
      </div>
    )
  }
  
  export default Main;