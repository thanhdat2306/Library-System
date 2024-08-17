import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { Book } from "../../../types/BookProps";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface BookListProps {
    books: Book[] | null;
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    if (!books) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return (    
        <Container className="px-5 pt-5">
            <div className="h1 text-center">
                All books
            </div>
            {books.map(book => (
                <Row className="mb-3" key={book.id}>
                    <Col className="col-12" >
                        <div className="border rounded bg-light h3 py-2 ps-3 m-0 text-center">
                            <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
                        </div>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default BookList;
