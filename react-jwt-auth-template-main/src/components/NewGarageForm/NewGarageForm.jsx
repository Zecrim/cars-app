import { useState, useEffect } from 'react';
import * as garageService from '../../services/garageService';


const NewGarageForm = (props) => {
  const emptyForm = { name: '' };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const fetchGarage = async () => {
      const garageData = await garageService.show(props.userId, props.garageId);
      setFormData({ name: garageData.name });
    };
    if (props.garageId) fetchGarage();
  }, [props.garageId, props.userId]);
  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.garageId) {
      props.handleEditGarage(formData);
    } else {
      props.handleNewGarage(formData);
    }
    setFormData(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{props.garageId ? 'Edit Garage Name' : 'New Garage Information'}</h1>
      <label htmlFor="text-input">Garage Name:</label>
      <input
        required
        type="text"
        name="name"
        id="text-input"
        value={formData.name}
        onChange={handleChange}
      /><br/>
      <button type="submit">{props.garageId ? 'Change Garage Name' : 'Create New Garage'}</button>
    </form>
  );
};

export default NewGarageForm;