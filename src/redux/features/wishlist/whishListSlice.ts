// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
interface IBook {
    _id: string | null;
    Title: string | null;
    Author: string | null;
    Genre: string | null;
    PublicationDate: string | null;
    Reviews: string[];
    status?: string | null;
    email?: string | null
}

interface IInitialState {
    wishlist: IBook[];
    readingList: IBook[];
}

const initialState: IInitialState = {
    wishlist: [],
    readingList: [],
};


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wishlist.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            const bookId = action.payload;
            state.wishlist = state.wishlist.filter((book) => book._id !== bookId);
        },
        addToReadingList: (state, action) => {
            state.readingList.push(action.payload);
        },
        removeFromReadingList: (state, action) => {
            const bookId = action.payload;
            state.readingList = state.readingList.filter((book) => book._id !== bookId);
        },
        markAsFinishedReading: (state, action) => {
            const bookId = action.payload;
            const book = state.readingList.find((book) => book._id === bookId);
            if (book) {
                book.status = 'finished reading';
            }
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    addToReadingList,
    removeFromReadingList,
    markAsFinishedReading,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;