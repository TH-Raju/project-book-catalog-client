import { api } from "@/redux/api/apiSlice";

const wishlistApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWishList: builder.query({
            query: (email) => {
                console.log(email)
                return {


                    url: '/reading',
                    method: 'GET',
                    params: { email }


                }
            },
            providesTags: ['updateStatus']
        }),
        postWishList: builder.mutation({
            query: (data) => ({
                url: '/wishlist',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['postwishlist'],
        }),
        addToReadingList: builder.mutation({
            query: (data) => ({
                url: '/reading',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['postreadinglist'],
        }),
        getReadingList: builder.query({
            query: (email) => ({
                url: '/reading',
                method: 'GET',
                params: { email },
            }),
            providesTags: ['updateStatus']
        }),
        updateReadingStatus: builder.mutation({
            query: (id) => ({

                url: `/updateRead/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['updateStatus'],
        }),


    })
})

export const { useUpdateReadingStatusMutation, usePostWishListMutation, useGetWishListQuery, useAddToReadingListMutation, useGetReadingListQuery } = wishlistApi
