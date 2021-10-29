import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChar = value => value.trim().length !== 5

const Checkout = (props) => {
    const nameRef = useRef('')
    const streetRef= useRef('')
    const cityRef = useRef('')
    const postalRef = useRef('')
    const [formInputValidity, setValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const streetName = streetRef.current.value;
    const cityName = cityRef.current.value;
    const postalName = postalRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(streetName);
    const enteredPostalIsValid = isNotFiveChar(postalName);
    const enteredCityIsValid = !isEmpty(cityName);

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

    setValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostalIsValid,
        city: enteredCityIsValid
    })

    if(!formIsValid) {
    return;
    }
    props.onConfirm({
      name: enteredName,
      street: streetName,
      postal: postalName,
      city: cityName
    })


    }
    const nameInvalidClasses = `${classes.control} ${!formInputValidity.name ? classes.invalid : ''}` 
    const streetInvalidClasses = `${classes.control} ${!formInputValidity.street ? classes.invalid : ''}`
    const postalInvalidClasses = `${classes.control} ${!formInputValidity.postal ? classes.invalid : ''}` 
    const cityInvalidClasses = `${classes.control} ${!formInputValidity.city ? classes.invalid : ''}` 
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
              <div className={nameInvalidClasses}>
              <label htmlFor='name'>Your Name</label>
              <input type='text' id='name' ref={nameRef}/>   
              {!formInputValidity.name && <p>Please enter name</p>}         
            </div>
            <div className={streetInvalidClasses}>
              <label htmlFor='street'>Street</label>
              <input type='text' id='street' ref={streetRef} />   
              {!formInputValidity.street && <p>Please enter street</p>}          
            </div>
            <div className={postalInvalidClasses}>
              <label htmlFor='postalCode'>Postal Code</label>
              <input type='text' id='postal' ref={postalRef}/>  
              {!formInputValidity.postal && <p>Postal code should be of 5 characters</p>}           
            </div>
            <div className={cityInvalidClasses}>
              <label htmlFor='city'>City</label>
              <input type='text' id='city' ref={cityRef} />  
              {!formInputValidity.city && <p>Please enter city</p>}           
            </div>
            <div className={classes.actions}>
            <button onClick={props.onClose}>Cancel</button>
            <button>Confirm</button>
            </div>
            

        </form>
    )

}
export default Checkout;