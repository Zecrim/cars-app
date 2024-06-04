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
    const [editCar, setEditCar] = useState(false)
    const [editComment, setEditComment] = useState('')
    

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

    const handleEditComment = async (commentId, formData) => {
    const returnedCar = await garageService.updateCarComment(userId, garageId, carId, commentId, formData);
    console.log(returnedCar)
    setCar(returnedCar)
    }
      
    const toggleEditCar = () => {
        editCar ? setEditCar(false) : setEditCar(true)
    }

    const toggleEditComment = (commentId) => {
        setEditComment(commentId)
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
                    <div className="comment-box">
                        {comment.author.username} {" "}posted on{" "}
                        {new Date(comment.createdAt).toLocaleDateString()}
                        <br />
                        <p>{comment.text}</p>
                        {comment.author._id === userId && (
                        <>
                            <button onClick={() => toggleEditComment(comment._id)}>Edit</button>
                            {editComment === comment._id && <CarCommentForm handleEditComment={handleEditComment} carId={carId} commentId={comment._id}/> }
                            <button onClick={() => handleDeleteComment(comment._id)}>
                            Delete
                            </button>
                        </>
                        )}
                    </div>
                </article>

            ))}
            </section>
    </div>
    </>
    )
}

export default CarShow