import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBook {
    _id: string | null;
    Title: string | null;
    Author: string | null;
    Genre: string | null;
    PublicationDate: string | null;
    Reviews: string[];
}

interface IBookState {
    book?: IBook;
    status?: boolean;
    modalStatus?: boolean,
    togglePostBook?: boolean
}

const initialState: IBookState = {
    book: {
        _id: null,
        Title: null,
        Author: null,
        Genre: null,
        PublicationDate: null,
        Reviews: [],
    },
    status: false,
    modalStatus: true,
    togglePostBook: false
};

const BookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<IBook>) => {
            state.book = action.payload;
            state.status = true
        },
        deleteBook: (state) => {
            state.book = {
                _id: null,
                Title: null,
                Author: null,
                Genre: null,
                PublicationDate: null,
                Reviews: [],
            };
            state.status = true
        },
        resetStatus: (state) => {
            state.status = false;
        },
        toggleModal: (state, action) => {
            state.modalStatus = action.payload
        },
        toggleAddPost: (state, action) => {
            state.togglePostBook = action.payload
        }
    },
});

export const { addBook, deleteBook, resetStatus, toggleModal, toggleAddPost } = BookSlice.actions;
export default BookSlice.reducer