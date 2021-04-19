import {Modal, Button} from 'react-bootstrap'
import Login from '../components/Login'

const SignInPopup = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body><Login /></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Back</Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
export default SignInPopup