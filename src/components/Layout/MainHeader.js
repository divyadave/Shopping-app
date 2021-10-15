import classes from './MainHeader.module.css';
import mealImage from '../../assets/meals.jpg';
import HeaderCart from './HeaderCart';


function MainHeader(props) {
    return (<>
    <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCart onShow={props.onShow}></HeaderCart>
    </header>
    <div className={classes['main-image']}>
        <img src={mealImage} alt="Meal image"></img>
    </div>

    </>)
}
export default MainHeader