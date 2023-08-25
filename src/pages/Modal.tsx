import { toggleModal } from "@/redux/features/Books/BookSlice";
import { useEditProductMutation } from "@/redux/features/Books/Booksapi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { format } from 'date-fns';

import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import './picker.css';
export default function Modal({book}:any) {
  const dispatch =  useAppDispatch()
  const [editProduct, { isLoading, isError }] = useEditProductMutation();
  console.log(isLoading,isError)
    const {user} =  useAppSelector(state=>state.user)
    const [publicationDate, setPublicationDate] = useState(new Date());


    const handleEdit = async (event: any) => {
      event.preventDefault();
      const formattedPublicationDate = format(publicationDate, 'dd-MM-yyyy');

      const updatedData = {
        Title: event.target.Title.value,
        Author: event.target.Author.value,
        Genre: event.target.Genre.value,
        PublicationDate: formattedPublicationDate,
      };
    
      const options = {
        id: book?._id,
        data: updatedData,
      };
    
      console.log(updatedData);
      editProduct(options);
      if(!isError){
        toast.success('books edited successfully')
      }
      else{
        toast.error('something went wrong')
      }
      dispatch(toggleModal(false))
    };
    
    const closemodal = () =>{
dispatch(toggleModal(false))
    }
    


  return (
    <div>
    <input type="checkbox" id={`my-modal-${book?._id}`} className="modal-toggle" />
 
    <div className="modal  modal-bottom sm:modal-middle">
      <div className="modal-box bg-[#fff] ">
      <p className='text-start mb-4 font-bold'>{book?.Title}</p>
    <form action="" onSubmit={handleEdit}>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closemodal}>✕</button>

    <label htmlFor="title" className="mt-4 text-black">Title</label> 
<input
  name="Title"
  type="text"
  placeholder="Title"
  className="input input-bordered border-2 text-black w-full bg-[#fff] mb-4"
  defaultValue={book?.Title || ''}
/>

<label htmlFor="author" className="mt-4 text-black">Author</label>
<input
  name="Author"
  type="text"
  placeholder="Author"
  className="input input-bordered border-2 text-black w-full bg-[#fff] mb-4"
  defaultValue={book?.Author || ''}
/>

<label htmlFor="genre" className="mt-4 text-black">Genre</label>
<input
  name="Genre"
  type="text"
  placeholder="Genre"
  className="input input-bordered border-2 text-black w-full bg-[#fff] mb-4"
  defaultValue={book?.Genre || ''}
/>
<label htmlFor="date" className="mt-4 text-black">Publication Date</label> <br />

<DatePicker
  name="PublicationDate"
  selected={publicationDate}
  onChange={(date:any) => setPublicationDate(date)}
  className="input input-bordered  border-2 text-black w-full bg-[#fff] mb-4 "
/>




    <input type="submit" value="submit" className='w-full mt-4 bg-[#000] py-2 rounded text-[#fff] font-bold' />
    </form>
        
      </div>
    </div>
    </div>
  )
}
