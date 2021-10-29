import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

/* const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ]; */

function AvailableMeals () {
  const [meals, setMeals] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [httpError, setHttpError] = useState()
  useEffect(() => {
    const fetchMeals = async() => {
      setLoading(true)
      const response =  await fetch('https://meals-de6cd-default-rtdb.firebaseio.com/meals.json').then();
      if(!response.ok) {
        throw new Error("Something went wrong")
      }
      const responseData = await response.json();
      let loadedData = []
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price

        })
        

      }
      setLoading(false)
      setMeals(loadedData)
      


    }
   
      fetchMeals().catch((error) => {
        setLoading(false)
        setHttpError(error.message)

      });

    
   
   
  
  }, [])
  if(isLoading) {
    return (
      <section className={classes.MealLoading}> 
        <p>Loading...</p>
      </section>
    )
  }
  if(httpError) {
    return (
      <section className={classes.errorText}>
        <p>{httpError}</p>
      </section>
    )
  }
    let mealList = meals.map((meal) => <MealItem id={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>)
    return (
        <section className={classes.meals}>
            <Card>
        <ul>
        {mealList}
        </ul>
        </Card>
        </section>
    )

}
export default AvailableMeals;