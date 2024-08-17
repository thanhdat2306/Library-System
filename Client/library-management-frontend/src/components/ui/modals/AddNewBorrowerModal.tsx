import { useState } from "react";
import { Borrower } from "../../../types/BorrowerProps";
import { Button, Form, Modal } from "react-bootstrap";
import { BorrowerService } from "../../../services/borrower.service";

interface NewBorrowerModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const initialBorrowerData: Borrower = {
    fullName: '',
    telephone: '',
    email: '',
};

const AddNewBorrowerModal: React.FC<NewBorrowerModalProps> = ({ showModal, toggleModal }) => {
    const [borrower, setBorrower] = useState<Borrower>(initialBorrowerData);

    const handleSubmit = () => {
        BorrowerService.create(borrower);
        toggleModal();
    }

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <span className="h1 m-0">Add New Borrower</span>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={borrower.fullName}
                            onChange={e => setBorrower(prev => ({
                                ...prev, fullName: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="tel"
                            placeholder="Phone"
                            value={borrower.telephone}
                            onChange={e => setBorrower(prev => ({
                                ...prev, telephone: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={borrower.email}
                            onChange={e => setBorrower(prev => ({
                                ...prev, email: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer >
                <Button className="mx-auto" variant="btn btn-outline-dark" size="lg" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNewBorrowerModal;