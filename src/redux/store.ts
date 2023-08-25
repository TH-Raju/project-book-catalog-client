import { configureStore } from '@reduxjs/toolkit';

import { api } from './api/apiSlice';
import bookReducer from './features/Books/BookSlice';
import userReducer from './features/user/userSlice';
import usewishListReducer from './features/wishlist/whishListSlice';

const store = configureStore({

    reducer: {

        user: userReducer,
        book: bookReducer,
        wishlist: usewishListReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;