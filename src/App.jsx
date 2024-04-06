import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import ProductCreateForm from './pages/ProductCreateForm/ProductCreateForm'
import ProductEditForm from './pages/ProductEditForm/ProductEditForm'
import ProductPage from './pages/ProductPage/ProductPage'
import Customers from "./pages/Customers/Customers"
import Orders from './pages/Orders/Orders'
import Offers from'./pages/Offers/Offers'
import OfferForm from './pages/OfferForm/OfferForm'
import PreSignUp from './pages/SignUp/PreSignUp'
import SellerSignUp from './pages/SignUp/SellerSignUp'
import ShopperSignUp from './pages/SignUp/ShopperSignUp'
import Login from './pages/Login/Login'
import Notifications from './pages/Notifications/Notifications'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/saga-orange/theme.css";
import 'primeicons/primeicons.css';
import './App.css'



function ShopperLayout() {
  return (
    <Outlet />
  );
}

function App() {

  return (
    <>
      <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/pre-signup" element={<PreSignUp />} /> {/* General signup */}
          <Route path="/shopper/signup" element={<ShopperSignUp />} /> {/* Shopper signup */}
          <Route path="/vendor/signup" element={<SellerSignUp />} /> {/* Seller signup */}

          <Route path="/shopper/*" element={<Navigate to="/" replace />} /> {/* Redirect shopper from vendor routes */}
          <Route path="/shopper" element={<Home />} /> {/* Shopper landing page (can be different) */}
          {/*<Route path="/shopper/products/product" element={<ProductPage />} />*/}

          <Route path="/shopper/product/:productSlug" element={<ProductPage />} /> 

          <Route path="/vendor" element={<Dashboard />} />
          <Route path="/vendor/products" element={<Products />} />
          <Route path="/vendor/products/new" element={<ProductCreateForm />} />
          <Route path="/vendor/products/:productSlug/edit" element={<ProductEditForm />} />
          <Route path="/vendor/offers/new" element={<OfferForm />} />
          <Route path="/vendor/offers" element={<Offers />} />
          <Route path="/vendor/customers" element={<Customers />} />
          <Route path="/vendor/orders" element={<Orders />} />
          <Route path="/vendor/notifications" element={<Notifications />} />
          <Route path="*" element={<div>Error: Page not found</div>} /> {/* Optional error handling */}
        </Routes>
      </PrimeReactProvider>
    </>
  )
}

export default App
