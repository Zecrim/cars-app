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
      // actually we'll want to do the same thing and lift the editGarage function up to the garage itself (same way we did for EditCar)
        garageService.updateGarage(props.garageId, formData); // make this return the garage and then use the garage to populate the formData
        //probably don't need navigate- we'll already be on the garage if we're editing it
        navigate(`/garages/${props.garageId}`);
    } else {
        props.handleNewGarage(formData);
    }
        setFormData({ name: '' });
    };

    <div className="editGarage">
        {editGarage && <NewGarageForm garage={garage} toggleEditGarage={toggleEditGarage} handleEditGarage={handleEditGarage}/>}
    </div>

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