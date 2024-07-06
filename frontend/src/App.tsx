import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Send from './pages/send';
import Update from './pages/update';
import Register from './pages/register';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CreateProductPage from './pages/CreateProductPage';
import Forgot from './pages/forgot';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAdmin } from './store/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
    dispatch(setAdmin(isAdmin));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<Send />} />
        <Route path="/update" element={<Update />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/user/:userId/:token/products" element={<ProductsPage />} />
        <Route path="/user/:userId/:token/product/:id" element={<ProductDetailsPage />} />
        <Route path="/user/:userId/:token/create-product" element={<CreateProductPage />} />
        <Route path="/user/:userId/:token/create-product/:productId" element={<CreateProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
