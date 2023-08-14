import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Item from './components/Item/Item'
import Cart from './components/Cart/Cart'
import CartProvider from './Context/CartContext/CartProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer greeting={ "Welcome" }/>} />
          <Route exact path="/category/:cate_id" element={<ItemListContainer />} />
          <Route exact path="/item/:id" element={<Item />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
