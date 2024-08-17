export interface Book {
    id: number,
    title: string,
    author: string,
    overview: string,
    language: string,
    copiesInStock: number,
    totalCopies: number
}

export interface BookData extends Omit<Book, 'id'> {}