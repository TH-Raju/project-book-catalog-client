
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Navbar from './layouts/Navbar';
import { auth } from './lib/firebase';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useAppDispatch } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <MainLayout />
    </div>
  );
}

export default App;
