import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import * as garageService from '../../services/garageService';
// import styles from './CommentForm.module.css';


const CarCommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { userId, garageId, carId } = useParams();

  useEffect(() => {
    const fetchComment = async () => {
      const carData = await garageService.carShow(userId, garageId, carId);
      setFormData(carData.comments.find((comment) => comment._id === props.commentId));
    };
    if (props.carId && props.commentId) fetchComment();
  }, [userId, garageId, carId, props.carId, props.commentId]);
  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.carId && props.commentId) {
        props.handleEditComment(props.commentId, formData)
      } else {
        props.handleAddComment(formData);
      }
      setFormData({ text: '' });
    };

    if (props.carId && props.commentId) return (
        <main className="car-comment-form">
          <form onSubmit={handleSubmit}>
            <h3>Edit Comment</h3>
            <label htmlFor="text-input">Updated comment:</label>
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
    <main className="car-comment-form">
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">New comment:</label>
      <br />
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      /><br/>
      <button type="submit">
        Add Comment
      </button>
    </form>
    </main>
  );
};

export default CarCommentForm;