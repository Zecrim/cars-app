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
    setCar(returnedCar)
    setEditComment('')
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
    <div className="car-show">
        <div className="carImage">
            <img src={car.imgURL} alt="Car" />
        </div>
        <div className="car-details">
            <span>Make: {car.make}</span>
            <span>Model: {car.model}</span>
            <span>Color: {car.color}</span>
            <span>Year: {car.year}</span>
            {garage.owner === userId && !editCar && (
                <>
                <button onClick={() => toggleEditCar(car)}>🔧</button>
                <button onClick={() => handleDeleteCar(carId)}>Sell Car (🗑️)</button>
                </>
                )}
        </div>
        <div className="editCar">
            {editCar && <NewCarForm car={car} toggleEditCar={toggleEditCar} handleEditCar={handleEditCar}/>}
        </div>
        <div className="car-comments-box">
            <div className='car-comment-tools'>
            <h2>Comments</h2>
            {!editComment && <CarCommentForm handleAddComment={handleAddComment} />}
            </div>

            <div className='car-comments'>
            {!car.comments.length && <p>There are no comments.</p>}

            {car.comments.map((comment) => (
                <article key={comment._id}>
                    <div className="comment-box">
                        <div className='comment-author'>
                            <Link to={`/${comment.author._id}`}>
                                {comment.author.username}
                            </Link>
                            {" "}posted on{" "}
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                        <div className='car-comment-items'>
                            <div className='car-comment-text'>
                                {comment.text}
                            </div>
                            {comment.author._id === userId && (
                            <>
                                <button onClick={() => toggleEditComment(comment._id)}>✏️</button>
                                {editComment === comment._id && <CarCommentForm handleEditComment={handleEditComment} carId={carId} commentId={comment._id}/> }
                                <button onClick={() => handleDeleteComment(comment._id)}>🗑️</button>
                            </>
                            )}
                        </div>
                    </div>
                </article>
            ))}
            </div>
        </div>
    </div>
    )
}

export default CarShow