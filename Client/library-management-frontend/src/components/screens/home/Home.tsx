import React, { useState } from "react";
import BookList from "./BookList";
import AddBookModal from "../../ui/modals/AddBookModal";
import { Book } from "../../../types/BookProps";
import TopPanel from "../../ui/top-panel/TopPanel";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import IssueBookModal from "../../ui/modals/IssueBookModal";
import { BooksProvider, useBooks } from "../../../context/BooksContext";

const Home: React.FC = () => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showIssueBookModal, setShowsetIssueBookModal] = useState(false);

    const { books, setBooks } = useBooks();
    const { serverDown } = useServerState();

    const handleAddBook = (newBook: Book) => {
        setBooks(prevBooks => [...prevBooks, newBook])
    }

    const handleBookIssue = (bookId: number) => {
        const updatedBooks = books.map(b => b.id === bookId ? { ...b, copiesInStock: b.copiesInStock - 1 } : b)
    };

    const toggleAddBookModal = () => setShowAddBookModal(!showAddBookModal);
    const toggleIssueBookModal = () => setShowsetIssueBookModal(!showIssueBookModal);

    if (serverDown) return <ServerDown />

    return (
        <>
            {books && (
                <TopPanel toggleAddBookModal={toggleAddBookModal} toggleIssueBookModal={toggleIssueBookModal}></TopPanel>
            )}
            <BookList books={books} />
            <AddBookModal showModal={showAddBookModal} onBookAdd={handleAddBook} toggleModal={toggleAddBookModal} />
            <IssueBookModal showModal={showIssueBookModal} onBookIssue={handleBookIssue} toggleModal={toggleIssueBookModal}></IssueBookModal>
        </>
    )
}

const HomeWrapper: React.FC = () => {
    return (
        <BooksProvider>
            <Home />
        </BooksProvider>
    )
}

export default HomeWrapper;