import { Link, useParams } from 'react-router-dom'

const CarList = (props) => {

const { userId, garageId } = useParams()

    if (!props.cars) return <main>Loading...</main>
    return (
        <>
            <main className='car-list'>
                <ul>
                    {props.cars.map((car) => (
                        <li key={car._id} className="car-item">
                            <Link to={`/${userId}/garages/${garageId}/${car._id}`}>
                                <img src={car.imgURL || 'placeholder.jpg'} alt={`${car.make} ${car.model}`} className="car-thumbnail" />
                                <div className='car-details'>
                                    <h2>{car.make} {car.model}</h2>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default CarList