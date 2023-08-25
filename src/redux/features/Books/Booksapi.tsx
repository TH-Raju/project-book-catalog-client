import { api } from "@/redux/api/apiSlice";

const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ Genre, Year, searchTerm }) => ({

                url: '/products',
                method: 'GET',
                params: { Genre, Year, searchTerm },

            }),
            providesTags: ['books', 'reviews', 'editBooks', 'postbooks'],

        }),
        singleBook: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ["books", 'reviews', 'editBooks', 'postbooks']
        }),
        getAllBooks: builder.query({
            query: () => `/products`,
            providesTags: ['books', 'reviews', 'editBooks', 'postbooks'],
        }),

        postBook: builder.mutation({
            query: (data) => ({
                url: '/product',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['postbooks'],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',



            }),
            invalidatesTags: ['books'],
        }),
        postReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/review/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['reviews'],
        }),
        editProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['editBooks'],
        }),
    })

})

export const {
    useGetBooksQuery,
    useSingleBookQuery,
    useDeleteBookMutation,
    usePostReviewMutation,
    useEditProductMutation,
    usePostBookMutation,
    useGetAllBooksQuery

} = booksApi