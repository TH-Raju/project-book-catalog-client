import { auth } from "@/lib/firebase";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const handleLogout = () => [
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null))
    }).catch((error) => {
      // An error happened.
    })
  ]

  const menuItems = <>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <li>
      <Link to="/products">Products</Link>
    </li>
    <li>
      {user?.email && <Link to="/addProduct">Add Product</Link>}
    </li>
    {user?.email && <li><Link to="/reading">My ReadingList</Link></li>}
    {user?.email && <li> <Link to="/wishlist">My WishList</Link></li>}

    <li>
      {!user.email && <Link to="/login">login</Link>}
    </li>

  </>
  return (
    <div className="navbar bg-gray-900  fixed top-0 z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl">
            {menuItems}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Book Catalog</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
        {
          !user.email ? <Link to="/signup"> <a className="btn">Sign up</a></Link> : <> <a className="me-2" href="">{user.email}  </a> <a onClick={handleLogout} className="btn bg-red-600 hover:bg-red-400 text-black">LogOut</a></>
        }
      </div>
    </div>
  )
}
