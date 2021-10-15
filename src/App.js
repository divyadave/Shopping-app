import logo from './logo.svg';
import './App.css';
import MainHeader from './components/Layout/MainHeader';
import Meals from './components/Meals/Meals';
import Cart from './components/Card/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setCart] = useState(false);
  const showHandler = () => {
    setCart(true)
  }
  const closeHandler = () => {
    setCart(false)
  }
  

  return (
   <CartProvider>
   <MainHeader onShow={showHandler}></MainHeader>
   <main>
     {showCart && <Cart onClose={closeHandler}></Cart> }
     <Meals></Meals>
   </main>
   </CartProvider>
  );
}

export default App;
