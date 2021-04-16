import { useDispatch, useSelector } from 'react-redux'
import {Button} from "react-bootstrap"
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const loggedIn = useSelector(state => state.loggedIn)
    const dispatch = useDispatch()


    
    const logout = () => {

        localStorage.removeItem('token')
        dispatch({
            type: 'RESET'
        })
    }

    if (!loggedIn){
        return (<Redirect to='/'/>)
    } else {
        return (<Button onClick = {logout}>Logout</Button>)
    }


}

export default Logout