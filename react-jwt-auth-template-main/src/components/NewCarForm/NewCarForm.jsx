import { useState, useEffect } from 'react';

const NewCarForm = (props) => {
    const emptyForm = {
        make: '',
        model: '',
        color: '',
        year: 1999,
        imgURL: '',
    }

    const [formData, setFormData] = useState(emptyForm);
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    useEffect(() => {
        const fillForm = () => {
            setFormData({
                make: props.car.make,
                model: props.car.model,
                color:props.car.color,
                year:props.car.year,
                imgURL:props.car.imgURL,
              })
        }
        if (props.car) fillForm();
    }, [props.car])

    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (props.car) {
            props.handleEditCar(formData)
        } else {
            props.handleNewCar(formData);
        }
        setFormData(emptyForm);
    };

    if (props.car?._id) return (
        <>
          <form onSubmit={handleSubmit}>
            <h1>Car Information</h1>
            <label htmlFor="text-input">Car Make:</label>
                <input
                    required
                    type="text"
                    name="make"
                    id="text-input"
                    value={formData.make}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="text-input">Car Model:</label>
                <input
                    required
                    type="text"
                    name="model"
                    id="text-input"
                    value={formData.model}
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
                <div className='new-car-form-buttons'>
                    <button onClick={props.toggleEditCar}>🚫 Cancel 🚫</button>
                    <button type="submit">🚘 Submit Changes 🚘</button>
                </div>
            </form>
        </>
    );

    return (
        <main className='new-car-form'>
            <form onSubmit={handleSubmit}>
            <h2>New Car Information</h2>
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
                <div className='new-car-form-buttons'>
                    <button onClick={props.toggleNewCar}>🚫 Cancel 🚫</button>
                    <button type="submit">🚘 Create New Car 🚘</button>
                </div>
            </form>
        </main>
    );
};

export default NewCarForm;