import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        let updatedItems = state.items.concat(action.item)
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const existingItem = state.items[existingItemIndex]
        

        if(existingItem) {
           const updateItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updateItem
            

        }
        else {
            updatedItems = state.items.concat(action.item)

        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    if(action.type === 'REMOVE') {
        console.log('state', state)
        console.log('action', action)
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingItem = state.items[existingItemIndex]
        console.log('existing', existingItem)
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if(existingItem.amount ===1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        else {
            const updatedItem = {...existingItem, amount: existingItem.amount -1};
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        
    }
    return defaultState
}

function CartProvider (props) {
    const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultState)

    const addItemToHandler = (item) => {
        dispatchCardAction({type: 'ADD', item: item})
    };
    const removeItemHandler = (id) => {
        dispatchCardAction({type: 'REMOVE', id: id})
    };

    const cartItems = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToHandler,
        removeItem: removeItemHandler
    }

    return <CartContext.Provider value={cartItems}>
        {props.children}
    </CartContext.Provider>

}
export default CartProvider;