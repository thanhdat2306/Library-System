import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useNotification from "../../../hooks/useNotification";
import { BookService } from "../../../services/book.service";
import { Book, BookData } from "../../../types/BookProps";
import NotificationBox from "../notification-box/NotificationBox";

interface AddBookModalProps {
    showModal: boolean;
    onBookAdd: (newBook: Book) => void;
    toggleModal: () => void;
}

const initialBookData: BookData = {
    title: '',
    author: '',
    overview: '',
    language: '',
    copiesInStock: 0,
    totalCopies: 0
};

const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, onBookAdd, toggleModal }) => {
    const [bookToAdd, setBookToAdd] = useState<BookData>(initialBookData);
    const { visible, mainText, subText, showNotification } = useNotification();

    const handleSubmit = async () => {
        try {
            const addedBook = await BookService.create(bookToAdd);
            if (addedBook) {
                toggleModal();
                onBookAdd(addedBook);
                setBookToAdd(initialBookData);
            }
            else showNotification("Failed to add book", "Please try again later", 5000)
        } catch {
            showNotification("Failed to add book", "Please try again later", 5000)
        }
    }

    return (
        <>
            <NotificationBox visible={visible} mainText={mainText} subText={subText} />
            <Modal show={showModal} onHide={toggleModal} className="">
                <Modal.Header closeButton>
                    <span className="h1 m-0">Add Book</span>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Title"
                                name="title"
                                value={bookToAdd.title}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, title: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Author"
                                name="author"
                                value={bookToAdd.author}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, author: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                name="overview"
                                value={bookToAdd.overview}
                                style={{ resize: "none" }}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, overview: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Language(s)"
                                name="language"
                                value={bookToAdd.language}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, language: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="h6">Сopies In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="Сopies In Stock"
                                name="copiesInStock"
                                value={bookToAdd.copiesInStock}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, copiesInStock: +e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="h6">Total Copies</Form.Label>
                            <Form.Control type="number"
                                min={0} placeholder="Total Copies"
                                name="totalCopies"
                                value={bookToAdd.totalCopies}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, totalCopies: +e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer >
                    <Button className="mx-auto" variant="btn btn-outline-dark" size="lg" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddBookModal;