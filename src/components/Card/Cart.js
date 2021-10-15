import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

function Cart(props) {
    const ctx = useContext(CartContext)
    const addCartHandler = (item) => {
        ctx.addItem(item)

    }
    const removeCartHandler =(id) => {
        console.log('id', id)
        ctx.removeItem(id)
        
    }
    const cartItems =(<ul className={classes['cart-items']}>
        {
            ctx.items.map((meal) => <CartItem id={meal.id} name={meal.name} amount={meal.amount} price={meal.price} onAdd={addCartHandler.bind(null, meal)} onRemove={removeCartHandler.bind(null, meal.id)}></CartItem>)
        }

    </ul>) 
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`
    const hasItems = ctx.items.length > 0;
    return(<Modal>
        {cartItems}
        <div className={classes.total}>
            <span>Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            { hasItems && <button className={classes.button}>Order</button> }
        </div>
    </Modal>);

}
export default Cart;