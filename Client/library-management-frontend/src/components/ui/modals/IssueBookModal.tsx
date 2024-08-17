import { Modal, Button, Form, Spinner } from "react-bootstrap";
import NotificationBox from "../notification-box/NotificationBox";
import useNotification from "../../../hooks/useNotification";
import { BookService } from "../../../services/book.service";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { IssueBookData } from "../../../types/IssueBookProps";
import { useBooks } from "../../../context/BooksContext";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from "react-bootstrap-typeahead";
import { BorrowerService } from "../../../services/borrower.service";
import { BorrowerDto } from "../../../types/BorrowerProps";
import AddNewBorrowerModal from "./AddNewBorrowerModal";

interface IssueBookModalProps {
    showModal: boolean;
    onBookIssue: (bookId: number) => void;
    toggleModal: () => void;
}

const initialIssueBookData: IssueBookData = {
    bookId: -1,
    borrowerId: -1,
    issuedById: -1,
    issueDate: "",
    returnBefore: "",
    notes: "",
};

const IssueBookModal: React.FC<IssueBookModalProps> = ({ showModal, onBookIssue, toggleModal }) => {
    const [issueBookData, setIssueBookData] = useState<IssueBookData>(initialIssueBookData);
    const { visible, mainText, subText, showNotification } = useNotification();
    const { id } = useAuth();
    const { books } = useBooks();
    const [bookSelectionValidation, setBookSelectionValidation] = useState<boolean>(true);

    const [borrowerType, setBorrowerType] = useState<'new' | 'existing' | 'not set'>('not set');
    const [borrowersOptions, setBorrowersOptions] = useState<BorrowerDto[]>([]);
    const [isLoadingBorrowers, setIsLoadingBorrowers] = useState<boolean>(false);

    const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);

    const [showNewBorrowerModal, setShowNewBorrowerModal] = useState(false);

    const toggleAddNewBorrowerModal = async () => {
        setShowNewBorrowerModal(!showNewBorrowerModal)
        if (borrowerType === 'new') {
            toggleModal();
            setBorrowerType('not set');
        }
    };

    useEffect(() => {
        const issueBook = async () => {
            if (shouldSubmit) {
                try {
                    const resultIssuingBook = await BookService.issue(issueBookData);
                    if (resultIssuingBook) {
                        toggleModal();
                        onBookIssue(issueBookData.bookId);
                        setIssueBookData(initialIssueBookData);
                    } else {
                        showNotification("Failed to issue book", "Please try again later", 5000);
                    }
                } catch {
                    showNotification("Failed to issue book", "Please try again later", 5000);
                } finally {
                    setShouldSubmit(false);
                }
            }
        };

        issueBook();
    }, [shouldSubmit, issueBookData, onBookIssue, showNotification, toggleModal]);

    const handleIssue = (e: React.FormEvent) => {
        e.preventDefault();

        if (!bookSelectionValidation) return;

        setIssueBookData(prev => ({ ...prev, issuedById: +id }));
        setShouldSubmit(true);
    };

    const handleBorrowerTypeChange = async (newBorrowerType: 'new' | 'existing') => {
        setBorrowerType(newBorrowerType);
        if (newBorrowerType === 'new') {
            toggleModal();
            toggleAddNewBorrowerModal();
        }
        else if (newBorrowerType === 'existing') {
            setIsLoadingBorrowers(true);
            try {
                const borrowersFullNames = await BorrowerService.getDtoBorrowers();
                if (borrowersFullNames) setBorrowersOptions(borrowersFullNames)

            } catch {
                showNotification("Unable to obtain registered borrowers", "Please try again later", 5000)
            }
            finally {
                setIsLoadingBorrowers(false);
            }
        }
    }

    const handleBookSelection = (selectedBook: string) => {
        const result = books.find(b => (b.title === selectedBook));
        if (result === undefined) return setBookSelectionValidation(false);
        setIssueBookData(prev => ({
            ...prev, bookId: result.id
        }))
        return setBookSelectionValidation(true);
    }

    return (
        <>
            <AddNewBorrowerModal showModal={showNewBorrowerModal} toggleModal={toggleAddNewBorrowerModal} />
            <NotificationBox visible={visible} mainText={mainText} subText={subText} />
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Issue Book</span>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Typeahead
                                id="book-select"
                                onChange={(selected) => {
                                    handleBookSelection(String(selected))
                                }
                                }
                                options={books.map(book => (
                                    book.title
                                ))}
                                placeholder="Book"
                                isInvalid={!bookSelectionValidation}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="h6 ms-1">Borrower</Form.Label>
                            <div className="ms-1 mb-2">
                                <Form.Check
                                    type="radio"
                                    label="Add New"
                                    value='new'
                                    checked={borrowerType === 'new'}
                                    onChange={e => handleBorrowerTypeChange(e.target.value as 'new' | 'existing')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Issue to an existing"
                                    value='existing'
                                    checked={borrowerType === 'existing'}
                                    onChange={e => handleBorrowerTypeChange(e.target.value as 'new' | 'existing')}
                                />
                            </div>
                        </Form.Group>
                        {borrowerType === 'existing' && (
                            <Form.Group className="mb-3">
                                {isLoadingBorrowers ? (
                                    <Spinner animation="border"></Spinner>
                                ) : (
                                    <Typeahead
                                        id="borrower-select"
                                        onChange={(selected) => {
                                            setIssueBookData(prev => ({
                                                ...prev, borrowerId: borrowersOptions.find((borrower) => String(selected) === borrower.fullName)!.id
                                            }))
                                        }}
                                        options={borrowersOptions.map(borrower => borrower.fullName)}
                                        placeholder="Borrower"
                                    />
                                )}
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label className="h6 ms-1">Issue Date</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="issueDate"
                                value={issueBookData.issueDate}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, issueDate: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="h6 ms-1">Return Before</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="returnBefore"
                                value={issueBookData.returnBefore}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, returnBefore: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Notes (if necessary)"
                                name="notes"
                                value={issueBookData.notes}
                                style={{ resize: "none" }}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, overview: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <hr className="mx-0 px-0" />
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                            <Button type="button" onClick={handleIssue} variant="btn btn-outline-dark" size="lg">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default IssueBookModal;