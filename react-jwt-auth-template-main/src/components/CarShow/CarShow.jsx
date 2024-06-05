import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CarCommentForm from '../CarCommentForm/CarCommentForm.jsx';
import NewCarForm from '../NewCarForm/NewCarForm'
import * as garageService from '../../services/garageService'

const CarShow = () => {

    const {userId, garageId, carId} = useParams()
    const [car, setCar] = useState()
    const [garage, setGarage] = useState()
    const navigate = useNavigate()
    const [editCar, setEditCar] = useState(false)
    const [editComment, setEditComment] = useState(false)
    const [editCommentId, setEditCommentId] = useState('')
    

    useEffect(() => {
        const fetchCar = async () => {
          const carData = await garageService.carShow(userId, garageId, carId)
          setCar(carData)
          const garageData = await garageService.show(userId, garageId)
          setGarage(garageData)
          document.documentElement.style.setProperty(
            '--background-image',
            'url("https://wallpapercave.com/wp/wp4334210.jpg")'
          );
          document.documentElement.style.setProperty(
            '--background-color',
            'transparent'
          );
        };
        if (carId) {
            fetchCar();
        }
        return () => {
            document.documentElement.style.setProperty('--background-image', 'none');
            document.documentElement.style.setProperty('--background-color', '#242424');
        };
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
        editComment? setEditComment(false) : setEditComment(true)
        editComment && setEditCommentId(commentId)
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
        <div className="background-overlay"></div>
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
            {editComment && <CarCommentForm handleEditComment={handleEditComment} carId={carId} commentId={editCommentId}/> }
            </div>

            <div className='car-comments'>
            {!car.comments.length && <p>There are no comments.</p>}

            {car.comments.map((comment) => (
                <article key={comment._id}>
                    <div className="comment-box">
                        <div className='comment-author'>
                            <div className='comment-author-name'>
                                <Link to={`/${comment.author._id}`}>
                                    {comment.author.username}
                                </Link>
                                <div className='comment-author-post'>
                                    {" "}posted on{" "}
                                </div>
                                <div className='comment-author-date'>
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className='car-comment-items'>
                            <div className='car-comment-text'>
                                {comment.text}
                            </div>
                        {comment.author._id === userId && (
                        <div className='car-comment-buttons'>
                            <button onClick={() => toggleEditComment(comment._id)}>✏️</button>
                            <button onClick={() => handleDeleteComment(comment._id)}>🗑️</button>
                        </div>
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