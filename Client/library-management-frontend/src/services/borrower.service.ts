import axios from "axios";
import { Borrower, BorrowerDto } from "../types/BorrowerProps";

const API_URL = `${process.env.REACT_APP_API_URL}/borrowers`;

export const BorrowerService = {
    async getDtoBorrowers(): Promise<BorrowerDto[] | null> {
        try {
            const response = await axios.get<BorrowerDto[]>(`${API_URL}/get-full-names-with-id`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching books:', error);
            return null;
        };
    },

    async create(borrower: Borrower): Promise<Borrower | null> {
        try {
            const response = await axios.post(API_URL, borrower);
            return response.data;
        } catch (error: any) {
            console.error('Error adding borrower:', error);
            return null;
        };
    }
}