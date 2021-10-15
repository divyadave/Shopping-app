import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Card/CartIcon";
import classes from './HeaderCart.module.css';

function HeaderCart(props) {
    const ctx = useContext(CartContext)
    const {items} = ctx;
    console.log('items', ctx)

    const [btnIsHighlighted, setHighlighted] = useState(false)
    const numberOfItems = ctx.items.reduce((curl, item) => {
        return curl + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`
    useEffect(() => {
        if(ctx.items.length === 0) {
            return;
        }
        setHighlighted(true)
        const timer = setTimeout(() => {
            setHighlighted(false)
            
        }, 300);
        return ()=> {
          clearTimeout(timer)
        }

    },[items])
    return (
        <button className={btnClasses} onClick={props.onShow}> 
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );

}
export default HeaderCart;