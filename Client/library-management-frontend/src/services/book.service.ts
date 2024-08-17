import axios from "axios";
import { Book, BookData } from "../types/BookProps";
import { IssueBookData } from "../types/IssueBookProps";

const API_URL = `${process.env.REACT_APP_API_URL}/books`;

export const BookService = {
    async getAll(setServerDown: (error: boolean) => void): Promise<Book[] | null> {
        try {
            const response = await axios.get<Book[]>(API_URL)
            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error fetching books:', error);
            return null;
        };
    },

    async getById(id: number, setBookIsInLibrary: (error: boolean) => void): Promise<Book | null> {
        try {
            const response = await axios.get<Book>(`${API_URL}/${id}`)
            setBookIsInLibrary(true);
            return response.data;
        } catch (error: any) {
            if (error.response.status === 404) setBookIsInLibrary(false);
            else console.error('Error fetching book:', error);
            return null;
        }
    },

    async create(bookToAdd: BookData): Promise<Book | null> {
        try {
            const response = await axios.post(API_URL, bookToAdd);
            return response.data;
        } catch (error: any) {
            console.error('Error adding book:', error);
            return null;
        };
    },

    async issue(issueBookData: IssueBookData): Promise<true | false> {
        try {
            const response = await axios.post(`${API_URL}/issue-book`, issueBookData);
            if (response.status === 200) return true
            else return false;
        } catch (error: any) {
            console.error('Error adding book:', error);
            return false;
        };
    }
}