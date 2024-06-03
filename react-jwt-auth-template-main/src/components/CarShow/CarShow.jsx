import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import * as garageService from '../../services/garageService'

const CarShow = () => {

    const {userId, garageId, carId} = useParams()
    const [car, setCar] = useState()

    useEffect(() => {
        const fetchCar = async () => {
          const carData = await garageService.carShow(userId, garageId, carId)
          setCar(carData)
        };
        if (carId) fetchCar();
      }, [userId, garageId, carId]);

    if (!car) return null
    return (
    <>
    <div className="carShow">
        Sweet car, bro!
        <div className="carDetails">
            <div className="carStats">
                Make: {car.make} <br />
                Model: {car.model} <br />
                Color: {car.color} <br />
                Year: {car.year} <br />
            </div>
            <div className="carImage">
                {car.imgURL}
             </div>
        </div>
        {/* <carCommentForm /> This is actually just the form, we need to have a component to display the comments here too probably like CarCommentList or something... or we could just do it inline since we have the car object here*/ }
    </div>
    </>
    )
}

export default CarShow