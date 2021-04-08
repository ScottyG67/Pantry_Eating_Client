import { useDispatch } from 'react-redux'
import {Button} from "react-bootstrap"

const Logout = () => {
    const dispatch = useDispatch()

    
    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            type: 'SET_USERNAME',
            username: ""
        })
        dispatch({
            type: 'SET_LOGGED_ID',
            loggedIn: false
        })
    }

    return (
        <Button onClick = {logout}>Logout</Button>
    )


}

export default Logout