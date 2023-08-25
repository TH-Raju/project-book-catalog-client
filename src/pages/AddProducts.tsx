import { useGetBooksQuery, usePostBookMutation } from "@/redux/features/Books/Booksapi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
export default function AddProducts() {
    const [PublicationDate, setPublicationDate] = useState(new Date());
    const {data} =  useGetBooksQuery(undefined)
    const email= useAppSelector(state=>state.user.user.email)
  const [postBook,createBookOptions] =  usePostBookMutation()
    const navigate =  useNavigate()
    const dispatch = useAppDispatch()
   const hadnleAddProduct =(event:any) =>{
    event.preventDefault()
const formattedPublicationDate = format(PublicationDate, 'yyyy-MM-dd');

const postData = {
  Title: event.target.Title.value,
  Author: event.target.Author.value,
  Genre: event.target.Genre.value,
  PublicationDate: formattedPublicationDate,
  email:email
};
postBook(postData)

 // Handle success or error messages after book creation
 console.log(createBookOptions)
navigate('/products')

// navigate('/products')

   }
  return (
    <div>
  
    <div className="pb-16">
         <div className='flex justify-center'>
         <div className=' mt-20 border border-2 border-accent px-6 py-20 w-96 text-center'>
      <p className='font-bold  mb-4' >Add A Product</p>
      <form  action="" onSubmit={hadnleAddProduct}>
  
    <label htmlFor="title" className="mt-4 text-[#fff]">Title</label> 
<input
  name="Title"
  type="text"
  placeholder="Title"
  className="input input-bordered input-accent  border-2 text-[#fff] w-full  mb-4"
required
/>

<label htmlFor="author" className="mt-4 text-[#fff]">Author</label>
<input
  name="Author"
  type="text"
  placeholder="Author"
  className="input input-bordered input-accent border-2 text-[#fff] w-full mb-4"
  required

/>

<label htmlFor="genre" className="mt-4 text-[#fff]">Genre</label>
<input
  name="Genre"
  type="text"
  placeholder="Genre"
  className="input input-bordered input-accent border-2 text-[#fff] w-full mb-4"
  required

/>
<label htmlFor="date" className="mt-4 text-[#fff]">Publication Date</label> <br />

<DatePicker
  name="PublicationDate"
  selected={PublicationDate}
  onChange={(date:any) => setPublicationDate(date)}
  className="input input-bordered input-accent  border-2  w-full text-[#fff] mb-4 "
/>




    <input type="submit" value="submit" className='w-full mt-4 btn-accent py-2 rounded text-[#fff] font-bold' />
    </form>
  </div>
  </div>
  </div>

  </div>
  )
}
