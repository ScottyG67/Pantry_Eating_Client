import {Modal, Button} from 'react-bootstrap'

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
  
export default ConfirmDelete