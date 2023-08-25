import { useGetReadingListQuery, useUpdateReadingStatusMutation } from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import { AiOutlineCheck } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import './pages.css';
export default function ReadingLIst() {
  const { email } = useAppSelector(state => state.user.user)

  console.log(email)
  const { data, isLoading } = useGetReadingListQuery(email)

  const [updateStaus, { isLoading: updateLoading, isError, isSuccess, error }] = useUpdateReadingStatusMutation()
  const handleupdateStatus = (id: string) => {
    updateStaus(id)
    console.log(id)
    if (isSuccess) {
      toast.success('reading status updated')
    }
    else {
      toast.error('something went wrong')
    }
    console.log(error)
  }
  return (
    <div className=" containers mx-auto">
      <ToastContainer />
      <h1 className="text-5xl font-bold pb-2 text-white text-center underline my-6">My Reading List</h1>
      <div className="grid grid-cols-1 container  sm:grid-cols-2 md:grid-cols-3 gap-4">

        {data?.map((book: any) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="https://l8.nu/rMS1" alt="Shoes" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{book?.newdata?.Title}</h2>
              <p>Books have the power to transport us to new worlds, ignite our imaginations, and inspire us to reach for greatness.</p>
              <p>Genre: {book?.newdata?.Genre}</p>
              <p>Author: {book?.newdata?.Author}</p>
              <p>Published: {book?.newdata?.PublicationDate}</p>
              {!book?.readingStatus ? <div className="card-actions justify-end">
                <button onClick={() => handleupdateStatus(book?._id)} className="btn btn-outline btn-success">Mark As Read  <AiOutlineCheck size={24} color="info" className="custom-icon" /></button>
              </div> : <button className="btn btn-outline btn-success " disabled>reading completed  <AiOutlineCheck size={24} color="info" className="custom-icon" /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
