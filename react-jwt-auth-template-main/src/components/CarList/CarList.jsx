import { Link, useParams } from 'react-router-dom'

const CarList = (props) => {

const { userId, garageId } = useParams()


    if (!props.cars) return <main>Loading...</main>
    return (
        <>
        <main className='car-list'>
        <ul>
        {props.cars.map((car) => (
            <li key={car._id}>
            <Link to={`/${userId}/garages/${garageId}/${car._id}`}>
            <h2 key={car._id}>{car.make} {car.model}</h2>
            </Link>
            </li>
        ))}
        </ul>
      </main>
      </>
    )
}

export default CarList