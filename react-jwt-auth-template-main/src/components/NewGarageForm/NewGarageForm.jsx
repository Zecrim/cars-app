import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import * as garageService from '../../services/garageService';
// import styles from './NewGarageForm.module.css';
// import Icon from '../Icon/Icon';


const NewGarageForm = (props) => {
  const [formData, setFormData] = useState({ name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGarage = async () => {
      const garageData = await garageService.show(props.garageId);
      // Find comment in fetched hoot data
      setFormData(garageData.name);
    };
    if (props.garageId) fetchGarage();
  }, [props.garageId]);
  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.garageId) {
        garageService.updateGarage(props.garageId, formData);
        navigate(`/garages/${props.garageId}`);
    } else {
        props.handleNewGarage(formData);
    }
        setFormData({ name: '' });
    };

    if (props.garageId) return (
        <main className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h1>Edit Garage Name</h1>
            <label htmlFor="text-input">Garage Name:</label>
            <input
              required
              type="text"
              name="name"
              id="text-input"
              value={formData.name}
              onChange={handleChange}
            />
            <button type="submit">Change Garage Name</button>
          </form>
        </main>
      );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Garage Name:</label>
      <input
        required
        type="text"
        name="name"
        id="text-input"
        value={formData.name}
        onChange={handleChange}
      />
      <button type="submit">Create new garage</button>
    </form>
  );
};

export default NewGarageForm;