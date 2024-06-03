import { useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CarCommentForm from '../CarCommentForm/CarCommentForm.jsx';
import { AuthedUserContext } from '../../App';
import * as garageService from '../../services/garageService'

const CarShow = () => {

    const {userId, garageId, carId} = useParams()
    const user = useContext(AuthedUserContext)
    const [car, setCar] = useState()
    const [garage, setGarage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCar = async () => {
          const carData = await garageService.carShow(userId, garageId, carId)
          setCar(carData)
          const garageData = await garageService.show(userId, garageId)
          setGarage(garageData)
        };
        if (carId) fetchCar();
      }, [userId, garageId, carId]);

      const handleAddComment = async (commentFormData) => {
        const newComment = await garageService.createCarComment(userId, garageId, carId, commentFormData);
        setCar({ ...car, comments: [...car.comments, newComment] });
    };

    const handleDeleteComment = async (commentId) => {
        const deletedComment = await garageService.deleteCarComment(userId, garageId, carId, commentId)
        setCar({
          ...car,
          comments: car.comments.filter((comment) => comment._id !== commentId),
        });
        console.log(deletedComment)
      };

      const handleDeleteCar = async (carId) => {
        // Call upon the service function:
        const deletedCar = await garageService.deleteCar(userId, garageId, carId);
        // Filter state using deletedHoot._id:
        setGarage(garage.cars.filter((car) => car._id !== deletedCar._id));
        // Redirect the user:
        navigate(`/${userId}/garages/${garageId}/`);
      };

    if (!car) return (
        <>
        Loading...
        </>
    )

    if (!garage) return (
        <>
        Loading...
        </>
    )
    return (
    <>
    <div className="carShow">
        Sweet car, bro!
        <section>
        <div className="carDetails">
            <div className="carStats">
                <p>
                    Make: {car.make} <br />
                    Model: {car.model} <br />
                    Color: {car.color} <br />
                    Year: {car.year} <br />
                </p>
            </div>
            <div className="carImage">
                <img src={car.imgURL} alt="Car" />
            </div>
            {garage.owner === userId && (
            <>
                <Link to={`${userId}/garages/${garageId}/${carId}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteCar(carId)}>Delete</button>
            </>
        )}
        </div>
        </section>
        <section>
            <h2>Comments</h2>
            <CarCommentForm handleAddComment={handleAddComment} />

            {!car.comments.length && <p>There are no comments.</p>}

            {car.comments.map((comment) => (
                <article key={comment._id}>
                <header>
                    <div>
                    {comment.author.username} <br />
                    {comment.author === userId && (
                    <>
                        <Link to={`/${userId}/garages/${garageId}/${carId}/comments/${comment._id}/edit`}>
                        Edit
                        </Link>
                        <button onClick={() => handleDeleteComment(comment._id)}>
                        Delete
                        </button>
                    </>
                    )}
                    </div>
                </header>
                <p>{comment.text}</p>
                </article>
            ))}
            </section>
    </div>
    </>
    )
}

export default CarShow