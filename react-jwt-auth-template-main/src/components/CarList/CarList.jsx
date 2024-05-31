import { Link } from 'react-router-dom'

const CarList = (props) => {

    if (!props.cars) return <main>Loading...</main>
    return (
        <main className='car-list'>
        {props.cars.map((car) => (
            <h2 key={car._id}>{car.make} {car.model}</h2>
        ))}
      </main>
    )
}

export default CarList