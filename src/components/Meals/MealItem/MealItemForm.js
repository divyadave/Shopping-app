import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm (props) {
    const amountRef= useRef();
    const [amountIsValid, setAmountValis] = useState(true)
    const onsubmitHandler = (event) => {
        event.preventDefault();
        const amountValue = amountRef.current.value
        const enteredValue = +amountValue

        if(enteredValue === 0 || enteredValue<1 || enteredValue > 5) {
            setAmountValis(false)
        }
        props.onAddCart(enteredValue)

    }
   
    return(
        <form className={classes.form} onSubmit={onsubmitHandler}>
          <Input label="Amount" ref={amountRef} input={{
            
              id: props.id,
              type: 'number',
              min: '1',
              max: '5',
              step: '1',
              defaultValue: '1'

          }}></Input>
           <button type="submit">+ Add</button>
           {!amountIsValid && <p>Please add less than 5</p>}
        </form>
    );

}
export default MealItemForm;