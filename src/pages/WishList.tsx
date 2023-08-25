import { useGetWishListQuery } from "@/redux/features/wishlist/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import './pages.css';
export default function WishList() {
  const {email} =  useAppSelector(state=>state.user.user)
    const {data} =  useGetWishListQuery(email)
    console.log(data)
  return (
    <div className="containers mx-auto">
          <div className="grid grid-cols-1 container  sm:grid-cols-2 md:grid-cols-3 gap-4">
       
       {data?.map((book:any) => (
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
           <div className="card-actions justify-end">
           <button  className="btn btn-primary bg-red-500 text-[#fff] border-0">Delete</button>
           </div>
         </div>
       </div>
       ))}
     </div>
    </div>
  )
}
