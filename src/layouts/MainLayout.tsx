import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div>
   
      <div className="py-16">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
