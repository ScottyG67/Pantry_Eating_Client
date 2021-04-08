

import {useDispatch, useSelector} from 'react-redux'

const ReduxTest = props => {
    const dispatch = useDispatch()
    const text = useState(state =>state.textInput)
    const password = useState(state =>state.passwordInput)

    return (
        <div>
            <input onChange=(e => dispatch({type:"SET_TEXT"}))
        </div>
    )
}