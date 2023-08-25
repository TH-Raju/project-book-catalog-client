import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import { createUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function Signup() {
  const { user, isError, error, isLoading } = useAppSelector(state => state.user)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  interface IUser {
    email: string,
    password: string
  }
  const onSubmit = (user: IUser) => {
    console.log(user)
    dispatch(createUser({ email: user?.email, password: user?.password }))
    if (!isError) {
      toast.success('user created successfully')
    }

  }
  if (isError) {
    toast.error(error)
  }
  useEffect(() => {
    if (user.email && !isLoading) {
      navigate('/home')
      toast.success("User created Successfully");
    }
  }, [user.email, isLoading, navigate]);

  return (
    <div>

      <Navbar></Navbar>
      <ToastContainer />
      <div className="pb-16">
        <div className='flex justify-center'>
          <div className=' mt-20 border border-2 px-6 py-20 w-96 text-center'>
            <p className='font-bold ' >Sign Up Now</p>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-control w-full">

              </div>





              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">email</span>
                </label>
                <input type="email"  {...register("email", { required: true })} placeholder="email here" className="input input-bordered border-2 w-full bg-[#fff]"
                  aria-invalid={errors.email ? "true" : "false"}

                />
                {errors.email?.type === 'required' && <p className='text-start' role="alert">email is required</p>}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">password  at least 6 character</span>
                </label>
                <input type="password"  {...register("password", { required: true, minLength: { value: 6, message: 'password must be 6 char..' } })} placeholder="password here" className="input input-bordered border-2 w-full bg-[#fff]"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === 'required' && <p className='text-start' role="alert">password is required and at least 6 character</p>}

                <label className="label mt-1">
                  <span className="label-text">already signup? <Link to='/login'>login Now</Link></span>
                </label>
              </div>


              <input type="submit" value='Signup Now' className='btn btn-primary bg-secondary1  border-0 mx-auto mt-4 w-full' />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
