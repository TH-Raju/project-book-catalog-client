import { addBook, resetStatus } from "@/redux/features/Books/BookSlice";
import { useGetAllBooksQuery, useGetBooksQuery } from "@/redux/features/Books/Booksapi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/BooksType";
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiBookReader } from 'react-icons/bi';
import { addToReadingList, addToWishlist } from "@/redux/features/wishlist/whishListSlice";
import { useAddToReadingListMutation, usePostWishListMutation } from "@/redux/features/wishlist/wishlistApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './pages.css';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Genre, setGenre] = useState("");
  const [Year, setYear] = useState(0);
  const { togglePostBook } = useAppSelector(state => state.book)
  const { wishlist, readingList } = useAppSelector(state => state.wishlist);
  const [addWishlist, { isError: wisherror, isLoading: wishloading }] = usePostWishListMutation()
  const [addReadingList, { isError: readingerror, isLoading: readingLoading }] = useAddToReadingListMutation()
  console.log(wishlist)
  console.log(wishlist); // 
  const { email } = useAppSelector(state => state.user.user)
  const { data, error, isLoading } = useGetBooksQuery({ Genre, Year, searchTerm });
  const { data: mainbook, isError, isLoading: bookloading } = useGetAllBooksQuery(undefined)
  const { status } = useAppSelector(state => state.book);
  const HandleSearch = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  };

  const dispatch = useAppDispatch();
  const handleSingleBook = (book: IBook) => {
    dispatch(addBook(book));
  };

  if (status) {
    toast.success('product deleted successfully');
    dispatch(resetStatus());
  }

  if (togglePostBook) {
    toast.success('book added successfully')

  }
  const handleAddWishList = (book: IBook) => {

    dispatch(addToWishlist(book))
    addWishlist(book)
    if (!wisherror) {
      toast.success('book added in wishlist')
    }
    else {
      toast.error('something went wrong')
    }

  }
  const handleAddToReadingList = (book: IBook) => {

    dispatch(addToReadingList(book))
    addReadingList(book)
    if (!readingerror) {
      toast.success('book added in reading list')
    }
    else {
      toast.error('something went wrong')
    }
  }

  if (isLoading || bookloading) {
    return (
      <>
        <div className="text-center">
          <span className="loading text-center loading-bar text-white loading-lg"></span>
        </div>
      </>
    )
  }








  return (
    <div className="containers mx-auto">
      <form action="" onSubmit={HandleSearch}>
        <div className="join flex justify-center flex-row mb-4">
          <div className="max-w-xs">
            <div>
              <input name="searchTerm" className="input input-bordered  join-item" placeholder="Search.." />
            </div>
          </div>
          <select className="select select-bordered join-item" onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            {mainbook?.data
              ?.map((book: IBook) => book.Genre)
              .filter((genre: string | undefined, index: number, genres: (string | undefined)[]) => genres.indexOf(genre) === index)
              .map((genre: string | undefined, index: number) => (
                <option value={genre} key={index}>
                  {genre}
                </option>
              ))}
          </select>

          <select className="select select-bordered join-item" onChange={(e) => setYear(Number(e.target.value))}>
            <option value="">All Year</option>
            {Array.from(
              new Set(
                mainbook?.data.map((book: IBook) =>
                  new Date(book.PublicationDate!).getFullYear()
                )
              )
            ).map((year) => (
              <option value={year?.toString()} key={year?.toString()}>
                {year as number}
              </option>
            ))}
          </select>


          <div className="indicator">
            <span className="indicator-item badge badge-secondary">search here</span>
            <button type="submit" className="btn join-item">Search</button>
          </div>
        </div>
      </form>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-5/6 mx-auto">
        {data?.data?.map((book: IBook) => (
          <div className="card lg:w-96  bg-base-100 shadow-xl">
            <figure>
              <img src="https://l8.nu/rMS1" alt="Shoes" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{book?.Title}</h2>
              <p>Books have the power to transport us to new worlds, ignite our imaginations, and inspire us to reach for greatness.</p>
              <p>Genre: {book?.Genre}</p>
              <p>Author: {book?.Author}</p>
              <p>Published: {book?.PublicationDate}</p>
              {
                email && <div className="flex justify-around mb-4 mt-4">
                  <div className="indicator">
                    <span className="indicator-item badge badge-primary">wishlist</span>

                    <AiFillHeart onClick={() => handleAddWishList(book)} size={44} color="white" />
                  </div>
                  <div className="indicator">
                    <span className="indicator-item badge  badge-secondary">readingList</span>
                    <BiBookReader onClick={() => handleAddToReadingList(book)} size={44} color="white" />
                  </div>

                </div>
              }
              <div className="card-actions justify-end">
                <Link to={`/product-details/${book._id}`}>
                  <button onClick={() => handleSingleBook(book)} className="btn btn-primary border-0">view details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
