import App from '@/App';
import AddProducts from '@/pages/AddProducts';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import ReadingLIst from '@/pages/ReadingLIst';
import Signup from '@/pages/Signup';
import WishList from '@/pages/WishList';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path: '/products',
        element: <Products/>
      },
      {
        path: '/addProduct',
        element: <PrivateRoute><AddProducts/></PrivateRoute>,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails/>,
      },
      {
        path: '/wishlist',
        element: <PrivateRoute><WishList/></PrivateRoute>
      },
      {
        path: '/reading',
        element: <PrivateRoute><ReadingLIst/></PrivateRoute>
      },
    
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '*',
    element: <NotFound/>,
  },
]);

export default routes;
