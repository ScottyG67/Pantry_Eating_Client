import {Modal, Button} from 'react-bootstrap'
import Login from '../components/Login'

export const SignInPopup = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body><Login /></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Back</Button>
            </Modal.Footer>
        </Modal>
    )
  }

const ConfirmDelete = ({show, handleClose, deleteObject}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>No</Button>
                <Button variant="danger" onClick={deleteObject}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
  }

 const ConfirmSaved = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Recipe Saved</Modal.Title>
            </Modal.Header>
            <Modal.Body>Excellent Choice. The recipe has been added to your saved recipes.</Modal.Body>
        </Modal>
    )
  }

  export {
      ConfirmDelete,
      ConfirmSaved
  }