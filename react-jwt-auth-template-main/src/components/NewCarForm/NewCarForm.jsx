import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as carService from '../../services/garageService';
// import styles from './NewGarageForm.module.css';
// import Icon from '../Icon/Icon';


const NewCarForm = (props) => {
    const emptyForm = {
        make: '',
        model: '',
        color: '',
        year: NaN,
        imgURL: '',
    }

    const [formData, setFormData] = useState(emptyForm);
    const navigate = useNavigate()
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (props.carId) {
            carService.updateCar(props.carId, formData);
            navigate(`/cars/${props.carId}`);
        } else {
            props.handleNewCar(formData);
        }
        setFormData(emptyForm);
    };

    if (props.garageId) return (
        <>
          <form onSubmit={handleSubmit}>
            <h1>New Car Information</h1>
            <label htmlFor="text-input">Car Make:</label>
                <input
                    required
                    type="text"
                    name="make"
                    id="text-input"
                    value={formData.model}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Model:</label>
                <input
                    required
                    type="text"
                    name="model"
                    id="text-input"
                    value={formData.make}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Color:</label>
                <input
                    type="text"
                    name="color"
                    id="text-input"
                    value={formData.color}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Year:</label>
                <input
                    required
                    type="number"
                    name="year"
                    id="text-input"
                    value={formData.year}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Image URL:</label>
                <input
                    type="text"
                    name="imgURL"
                    id="text-input"
                    value={formData.imgURL}
                    onChange={handleChange}
                /><br/>
            <button type="submit">Create New Car</button>
            </form>
        </>
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
            <h1>New Car Information</h1>
            <label htmlFor="text-input">Car Model:</label>
                <input
                    required
                    type="text"
                    name="model"
                    id="text-input"
                    value={formData.model}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Make:</label>
                <input
                    required
                    type="text"
                    name="make"
                    id="text-input"
                    value={formData.make}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Color:</label>
                <input
                    type="text"
                    name="color"
                    id="text-input"
                    value={formData.color}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Year:</label>
                <input
                    required
                    type="number"
                    name="year"
                    id="text-input"
                    value={formData.year}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Image URL:</label>
                <input
                    type="text"
                    name="imgURL"
                    id="text-input"
                    value={formData.imgURL}
                    onChange={handleChange}
                /><br/>
            <button type="submit">Create New Car</button>
            </form>
        </>
    );
};

export default NewCarForm;