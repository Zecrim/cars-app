import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import * as carService from '../../services/garageService';
// import styles from './NewGarageForm.module.css';
// import Icon from '../Icon/Icon';


const NewCarForm = (props) => {
    const [formData, setFormData] = useState({ name: '' });

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
        setFormData({
            make: '',
            model: '',
            color: '',
            year: '',
            imgURL: '',
        });
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