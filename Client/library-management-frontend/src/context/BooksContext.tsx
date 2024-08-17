import { useContext, createContext, useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import { useServerState } from "./SeverStateContext";
import { BookService } from "../services/book.service";

interface BooksContextProps {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BooksContext = createContext<BooksContextProps | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ books, setBooks ] = useState<Book[]>([]);

    const { setServerDown } = useServerState();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await BookService.getAll(setServerDown);
            if (response) setBooks(response);
        }
        fetchBooks();
    }, [setServerDown]);

    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BooksContext);
    if (context === undefined) {
        throw new Error('useBooks must be used withint a BooksProvider');
    }
    return context;
};