import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardText, CardTitle } from "react-bootstrap";
import { Book } from "../../../types/BookProps";
import "./BooDetails.css";
import { BooksProvider, useBooks } from "../../../context/BooksContext";

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | undefined>();
    const { books } = useBooks();

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                const result = books.find((b) => b.id === +id);
                setBook(result);
            }
        }
        fetchBook();
    }, [books, id]);

    if (book === undefined) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="d-flex flex-column align-items-center text-center">
                    <div>
                        <h1>
                            There is no such book in our library
                        </h1>
                    </div>
                    <div>
                        <h2>
                            <Link to={'/'}>Back to the list of books</Link>
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="d-flex align-items-center flex-column w-50">
                <Card className="p-3 pb-0 modal-w60">
                    <Card.Body>
                        <CardTitle>
                            <p className="h1 text-center">«{book.title}»</p>
                        </CardTitle>
                        <CardText>
                            <span className="h4 pb-2 text-center">by {book.author}</span>
                        </CardText>
                        <CardText>
                            <span className="fw-bold">Description:</span> {book.overview}
                        </CardText>
                        <CardText>
                            <span className="fw-bold">Language(s):</span> {book.language}
                        </CardText>
                        <CardText>
                            <span className="fw-bold">Copies In Stock:</span> {book.copiesInStock}
                        </CardText>
                        <CardText>
                            <span className="fw-bold">Total Copies:</span> {book.totalCopies}
                        </CardText>
                    </Card.Body>
                </Card>
                <h2 className="pt-3">
                    <Link to={"/"} className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                        Back to the list of books
                    </Link>
                </h2>
            </div>
        </div>
    )
}

const BookDetailsWrapper: React.FC = () => {
    return (
        <BooksProvider>
            <BookDetails />
        </BooksProvider>
    )
}

export default BookDetailsWrapper;