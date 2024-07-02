import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Send from './pages/send';
import Update from './pages/update';
import Register from './pages/regsiter';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CreateProductPage from './pages/CreateProductPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<Send />} />
        <Route path="/update" element={<Update />} />
        <Route path="/user/:userId/products" element={<ProductsPage />} />
        <Route path="/user/:userId/product/:id" element={<ProductDetailsPage />} />
        <Route path="/user/:userId/create-product" element={<CreateProductPage />} />
        <Route path="/user/:userId/create-product/:productId" element={<CreateProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
