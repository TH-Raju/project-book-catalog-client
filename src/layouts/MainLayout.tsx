import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className='mt-9'>

      <div className="py-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
