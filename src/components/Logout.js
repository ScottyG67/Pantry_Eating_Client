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
            type: 'SET_USER_ID',
            userId: ''
        })
        dispatch({
            type: 'SET_LOGGED_IN',
            loggedIn: false
        })
        dispatch({
            type:'SET_RECIPES',
            searchRecipes: []
        })
        dispatch({
            type:'SET_SAVED_RECIPES',
            savedRecipes: []
        })
        dispatch({
            type:'SET_PANTRY_ITEMS',
            pantryItems:[]
        })
        dispatch({
            type:'SET_ITEM_SEARCH_RESULTS',
            itemSearchResults:[]
        })
    }

    return (
        <Button onClick = {logout}>Logout</Button>
    )


}

export default Logout