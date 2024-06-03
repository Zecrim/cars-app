import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import * as garageService from '../../services/garageService';
import styles from './CommentForm.module.css';


const CarCommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { userId, garageId, carId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const carData = await garageService.show(carId);
      // Find comment in fetched hoot data
      setFormData(carData.comments.find((comment) => comment._id === commentId));
    };
    if (carId && commentId) fetchCar();
  }, [carId, commentId]);
  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (carId && commentId) {
        garageService.updateComment(carId, commentId, formData);
        navigate(`/${userId}/garages/${garageId}/cars/${carId}`);
      } else {
        props.handleAddComment(formData);
      }
      setFormData({ text: '' });
    };

    if (carId && commentId) return (
        <main className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h1>Edit Comment</h1>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
              required
              type="text"
              name="text"
              id="text-input"
              value={formData.text}
              onChange={handleChange}
            />
            <button type="submit">Submit
            </button>
          </form>
        </main>
      );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">
        Create
      </button>
    </form>
  );
};

export default CarCommentForm;