import {Button} from "react-bootstrap"

const Logout = () => {

    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Button onClick = {logout}>Logout</Button>
    )


}

export default Logout