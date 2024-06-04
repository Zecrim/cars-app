import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CarList from '../CarList/CarList'
import NewCarForm from '../NewCarForm/NewCarForm'
import NewGarageForm from '../NewGarageForm/NewGarageForm';
import * as garageService from '../../services/garageService'

const Garage = (props) => {

    const { userId, garageId } = useParams()
    const [newCar, setNewCar] = useState(false)
    const [garageName, setGarageName] = useState('')
    const [garageOwner, setGarageOwner] = useState('')
    const [cars, setCars] = useState([])
    const [garages, setGarages] = useState([])
    const [editGarage, setEditGarage] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate()

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
        setEditGarage(null); 
      };

    const fetchGarages = async () => {
        const fetchedGarages = await garageService.show(userId, garageId);
        setGarages(fetchedGarages);
    };

    useEffect(() => {
        const fetchCars = async () => {
          const garageData = await garageService.show(userId, garageId)
          setCars(garageData.cars)
          setGarageName(garageData.name)
          setGarageOwner(garageData.owner)
        };
        if (garageId) fetchCars();
      }, [garageId]);


    const toggleNewCar = () => {
        newCar? setNewCar(false) : setNewCar(true)
    }
    
    const handleNewCar = async (formData) => {
        const newCar = await garageService.createCar(userId, garageId, formData);
        setCars([...cars, newCar]);
        toggleNewCar();
    }

    const handleDeleteGarage = async (garageId) => {
        try {
            const deletedGarage = await garageService.deleteGarage(userId, garageId);
            if (deletedGarage) {
                props.setGarages(prevGarages => prevGarages.filter((garage) => garage._id !== deletedGarage._id));
                await fetchGarages();
                navigate(`/`);
            }
        } catch (error) {
            console.error("Failed to delete the garage:", error);
        }
    };

    const handleNewGarage = async (formData) => {
        const newGarage = await garageService.createGarage(formData);
        setGarages([...garages, newGarage]);
        toggleForm(); // Hide the form after creating a new garage
      };
    
      const handleEditGarage = async (formData) => {
        const updatedGarage = await garageService.updateGarage(userId, garageId, formData);
        setGarageName(updatedGarage.name);
        setEditGarage(false)

        toggleForm(); // Hide the form after editing the garage
      };
    
      const handleEditButtonClick = () => {
        setIsFormVisible(true);  // Show the form when editing
      };

    return (
        <main className='garage'>
            <div>
                <h1>Welcome to {garageName}</h1>
                {userId === garageOwner && (!isFormVisible) && (
                    <>
                        <button onClick={handleEditButtonClick}>✏️</button>
                        <button onClick={() => handleDeleteGarage(garageId)}>🗑️</button>
                    </>
                )}
            </div>
            <CarList cars={cars}/>
            <div className="garage">
            {userId === garageOwner && (
                <button className="toggleButton" onClick={toggleNewCar}>Add a Car</button>
            )}
                {newCar && <NewCarForm handleNewCar={handleNewCar} toggleNewCar={toggleNewCar} />}
                
            </div>
            {isFormVisible && (
                <NewGarageForm
                userId={userId}
                garageId={garageId}
                handleNewGarage={handleNewGarage}
                handleEditGarage={handleEditGarage}
                />
            )}
        </main>
     )
}

export default Garage