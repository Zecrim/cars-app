import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CarList from '../CarList/CarList'
import NewCarForm from '../NewCarForm/NewCarForm'
import NewGarageForm from '../NewGarageForm/NewGarageForm';
import * as garageService from '../../services/garageService';
import GaragePhoto from '../../assets/GaragePhoto.png'; 


const Garage = (props) => {

    const { userId, garageId } = useParams()
    const [newCar, setNewCar] = useState(false)
    const [garageName, setGarageName] = useState('')
    const [garageOwner, setGarageOwner] = useState('')
    const [cars, setCars] = useState([])
    const [garages, setGarages] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate()

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
      };

    const fetchGarages = async () => {
        const fetchedGarages = await garageService.show(userId, garageId);
        setGarages(fetchedGarages);
    };

    useEffect(() => {
        const fetchCars = async () => {
          const garageData = await garageService.show(userId, garageId);
          setCars(garageData.cars);
          setGarageName(garageData.name);
          setGarageOwner(garageData.owner);
          document.documentElement.style.setProperty(
            '--background-image',
            `url(${GaragePhoto})`
          );
          document.documentElement.style.setProperty(
            '--background-color',
            'transparent'
          );
        };
    
        if (garageId) {
          fetchCars();
        }
    
        return () => {
          document.documentElement.style.setProperty('--background-image', 'none');
          document.documentElement.style.setProperty('--background-color', '#242424');
        };
      }, [garageId, userId]);


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
    
    const handleEditGarage = async (formData) => {
      const updatedGarage = await garageService.updateGarage(userId, garageId, formData);
      setGarageName(updatedGarage.name);
      toggleForm();
    };
  
    const handleEditButtonClick = () => {
      setIsFormVisible(true);
    };

    return (
        <main className='garage'>
            <div className="background-overlay"></div>
            <div className='garage-header'>
                {!isFormVisible && (
                <h1>Welcome to {garageName}</h1>
                )}
                {isFormVisible && (
                <NewGarageForm
                userId={userId}
                garageId={garageId}
                handleEditGarage={handleEditGarage}
                />
            )}
                {userId === garageOwner && (!isFormVisible) && (
                    <div>
                        <button onClick={handleEditButtonClick}>✏️</button>
                        <button onClick={() => handleDeleteGarage(garageId)}>🗑️</button>
                    </div>
                )}
            </div>
            
            <CarList cars={cars}/>
            <div className='new-car-button'>
            {userId === garageOwner && (
                <button className="toggleButton" onClick={toggleNewCar}>Add a Car</button>
            )}
                {newCar && <NewCarForm handleNewCar={handleNewCar} toggleNewCar={toggleNewCar} />}
                
            </div>
        </main>
     )
}

export default Garage