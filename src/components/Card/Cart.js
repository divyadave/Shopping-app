import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {
    const ctx = useContext(CartContext)
    const [showOrder, setOrder] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);
    const addCartHandler = (item) => {
        ctx.addItem(item)

    }
    const removeCartHandler =(id) => {
        console.log('id', id)
        ctx.removeItem(id)
        
    }
    const orderHandler = () => {
        setOrder(true)

    }
    const submitHandler = async(cartData) => {
        setIsSubmitting(true)
        await fetch('https://meals-de6cd-default-rtdb.firebaseio.com/orders.json', {
           method : 'POST',
           body: JSON.stringify({
               userData: cartData,
               orderItem: ctx.items
           })
        })
        setIsSubmitting(false)
        setdidSubmit(true)
        ctx.clearCart()

    }
    const cartItems =(<ul className={classes['cart-items']}>
        {
            ctx.items.map((meal) => <CartItem id={meal.id} name={meal.name} amount={meal.amount} price={meal.price} onAdd={addCartHandler.bind(null, meal)} onRemove={removeCartHandler.bind(null, meal.id)}></CartItem>)
        }

    </ul>)

const totalAmount = `$${ctx.totalAmount.toFixed(2)}`
const hasItems = ctx.items.length > 0;

const modelActions = (
    <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
    { hasItems && <button className={classes.button} onClick={orderHandler}>Order</button> }
</div>

)
    
    const cartModalContent = (
        <>
          {cartItems}
        <div className={classes.total}>
            <span>Amount</span>
            <span>{totalAmount}</span>
        </div>
        { showOrder && <Checkout onConfirm={submitHandler} onClose={props.onClose}></Checkout>}
        { !showOrder && modelActions }
        </>
    )
    const isSubmittingContent = <p>Sending order data...</p>
    const didSubmitModalContent = <><p>Successfully sent the order!</p>
     <button onClick={props.onClose} className={classes.button}>Close</button></>

      
  
    return(<Modal>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>);

}
export default Cart;