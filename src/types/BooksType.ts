export interface IBook {
    _id: string | null,
    Title: string | null,
    Author: string | null,
    Genre: string | null,
    PublicationDate: | null,
    Reviews: string[] | [],
    status?: boolean | string | null,
    readingStatus?: string | null
    wishlistStatus?: boolean
    email?: string
}