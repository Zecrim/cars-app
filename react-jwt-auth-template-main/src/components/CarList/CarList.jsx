

const CarList = (props) => {

    if (!props.car) return <main>Loading...</main>
    return (
        <main className='track-list'>
        {props.cars.map((car) => (
            <h2 key={car._id}>{car.make} {car.model}</h2>
        ))}
      </main>
    )
}

export default CarList