import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CarList from '../CarList/CarList'
import NewCarForm from '../NewCarForm/NewCarForm'
import * as garageService from '../../services/garageService'



const Garage = (props) => {

    const { userId, garageId } = useParams()
    const [newCar, setNewCar] = useState(false)
    const [garageName, setGarageName] = useState('')
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
          const garageData = await garageService.show(userId, garageId)
          setCars(garageData.cars)
          setGarageName(garageData.name)
        };
        if (garageId) fetchCars();
      }, [garageId]);


    const toggleNewCar = () => {
        newCar? setNewCar(false) : setNewCar(true)
    }
    
    const handleNewCar = async (formData) => {
        const newCar = await garageService.createCar(userId, garageId, formData);
        setCars([...cars, newCar]);
        toggleNewCar();
    }

    return (
        <>
            <div>
                <h1>Welcome to {garageName}</h1>
            </div>
            <CarList cars={cars}/>
            <div className="garage">
                <button onClick={toggleNewCar}>Add a Car</button>
                {newCar && <NewCarForm handleNewCar={handleNewCar} />}
                
            </div>
        </>
     )
}

export default Garage