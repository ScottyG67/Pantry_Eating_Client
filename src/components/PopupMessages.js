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

export const ConfirmDelete = ({show, handleClose, deleteObject}) => {
  
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

 export const ConfirmSaved = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Saved!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Excellent Choice.</Modal.Body>
        </Modal>
    )
  }

  export const SearchFail = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nothing Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sorry, nothing matching your search was found.</Modal.Body>
        </Modal>
    )
  }

  export const LoginFail = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Try Again</Modal.Title>
            </Modal.Header>
            <Modal.Body>There was a problem with your username or password</Modal.Body>
        </Modal>
    )
  }

  export const ConfirmAccountDelete = ({show, handleClose, deleteAccount}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Body>This cannot be undone</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>No</Button>
                <Button variant="danger" onClick={deleteAccount}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
  }

  export const AccountDeletedConf = ({show, handleClose}) => {
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your Account Has Been Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>We are sad to see you go.</Modal.Body>
            <Modal.Body>That being said, we understand and all data associated with your account has been deleted.</Modal.Body>
        </Modal>
    )
  }
