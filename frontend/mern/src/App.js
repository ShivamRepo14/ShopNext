import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './contexts/Register';
import Login from './components/Login';
import Navigate from './components/Navigate';
import Home from './Home';
import { createContext, useReducer, useState, useEffect } from 'react';
import { initialState, reducer } from './contexts/Usereducer';
import Clothing from './subcategories/Clothing.';
import Footwear from './subcategories/Footwear';
import Handbags from './subcategories/Handbags';
import Accessories from './subcategories/Accessories';
import ProductDetail from './components/ProductDetail';
import Logout from './contexts/Logout';
import Cart from './contexts/Cart';
import ProductCard from './components/ProductCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CategoryPage from './components/CategoryPage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const usercontext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <usercontext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navigate />
        <ToastContainer
          position="top-center"
          autoClose={3000}       
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path='/Register' element={<Register />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryPage products={products} />}
          />
          <Route path='/Login' element={<Login />} />
          {/* <Route path='/' element={<> <Home /> <ProductCard /> </>} /> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/Logout' element={<Logout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='category/accessories' element={<Accessories />} />
          <Route path='category/footwears' element={<Footwear />} />
          <Route path='category/clothings' element={<Clothing />} />
          <Route path='category/handbags' element={<Handbags />} />
          <Route path='/accessory/:id' element={<ProductDetail />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/' element={<ProductCard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </usercontext.Provider>
  );
}

export default App;
