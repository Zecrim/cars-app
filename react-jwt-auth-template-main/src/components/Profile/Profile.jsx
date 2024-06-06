import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import ProfilePhoto from '../../assets/ProfilePhoto.png'; 



const Profile = (props) => {
    const {userId} = useParams()

    const [myGarages, setMyGarages] = useState([])
    useEffect(() => {
        const fetchgarages = async () => {
            const myGarageList = props.garages.filter(garage => garage.owner._id === userId);
            setMyGarages(myGarageList);
            document.documentElement.style.setProperty(
                '--background-image',
                `url(${ProfilePhoto})`
            );
            document.documentElement.style.setProperty(
                '--background-color',
                'transparent'
            );
        };

        if (userId) {
            fetchgarages();
        }

        return () => {
            document.documentElement.style.setProperty('--background-image', 'none');
            document.documentElement.style.setProperty('--background-color', '#242424');
        };
      }, [userId, props.garages]);

      const newButtonClick = () => {
        props.toggleNewGarage()
      }


    return (
        <div className = "profile">
            <div className="background-overlay"></div>
            {myGarages[0]? <h1>{myGarages[0]?.owner.username}'s Garages</h1> : <h1>Add a garage to get started!</h1>}<br/>
            <ul>
                {myGarages.map((garage) => (
                        <li key={garage._id}>
                        <Link to={`/${userId}/garages/${garage._id}`}>
                            <div>
                                <h2>{garage.name}</h2>
                            </div>
                        </Link>
                        </li>
                )
                )}
            </ul><br/>
            {props.user._id === userId && <button onClick={newButtonClick} className='addGarageButton'>Add a Garage</button>}
        </div>
    )
}

export default Profile;