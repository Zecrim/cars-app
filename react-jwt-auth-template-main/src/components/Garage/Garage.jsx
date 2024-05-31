import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CarList from '../CarList/CarList'


const Garage = (props) => {

    const { userID, garageId } = useParams()
    const [newCar, setNewCar] = useState(false)
    

    useEffect(() => {
        const fetchCars = async () => {
          const carData = await garageService.show(userId, garageId)
          props.setCars(carData)
        };
        if (garageId) fetchCars();
      }, [garageId]);


    const toggleNewCar = () => {
        newCar? setNewCar(false) : setNewCar(true)
    }
    
    const handleNewCar = async (formData) => {
        const newCar = await garageService.createCar(userId, garageId, formData);
        props.setCars([... props.cars, newCar]);
        toggleNewGarage();
    }

    return (
        <div className="garage">
        <button onClick={toggleNewCar}>Add a Car</button>
        {newCar && <NewCarForm handleNewCar={handleNewCar} />}
        <CarList cars={props.cars}/>
        </div>
     )
}

export default Garage