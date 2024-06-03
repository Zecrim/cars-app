import { useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CarCommentForm from '../CarCommentForm/CarCommentForm.jsx';
import NewCarForm from '../NewCarForm/NewCarForm'
import { AuthedUserContext } from '../../App';
import * as garageService from '../../services/garageService'

const CarShow = () => {

    const {userId, garageId, carId} = useParams()
    const user = useContext(AuthedUserContext)
    const [car, setCar] = useState()
    const [garage, setGarage] = useState()
    const navigate = useNavigate()
    const [editCar, setEditCar] = useState()
    

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
        navigate(`/${userId}/garages/${garageId}`);
      };

      const handleEditCar = async (formData) => {
        // console.log(userId, garageId, carId, formData)
        const updatedCar = await garageService.updateCar(userId, garageId, carId, formData);
        setCar(updatedCar)
        toggleEditCar(false)
      }
      
      const toggleEditCar = () => {
        editCar ? setEditCar(false) : setEditCar(true)
    }


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
        <div className="carImage">
            <img src={car.imgURL} alt="Car" />
        </div>
        <div className="carDetails">
            <div className="carStats">
                <p>
                    Make: {car.make} <br />
                    Model: {car.model} <br />
                    Color: {car.color} <br />
                    Year: {car.year} <br />
                </p>
            </div>
            
        <div className="editCar">
        {editCar && <NewCarForm car={car} toggleEditCar={toggleEditCar} handleEditCar={handleEditCar}/>}
        </div>

        {garage.owner === userId && (
            <>
            <button onClick={() => toggleEditCar(car)}>Modify Car</button>
            <button onClick={() => handleDeleteCar(carId)}>Sell Car (delete)</button>
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
                    {comment.author.username} 
                    {new Date(comment.createdAt).toLocaleDateString()}
                    <br />
                    {console.log(comment.author.username)}
                    {comment.author._id === userId && (
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