import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';


const Profile = (props) => {
    const {userId} = useParams()

    const [myGarages, setMyGarages] = useState([])
    useEffect(() => {
        const fetchgarages = async () => {
            const myGarageList = props.garages.filter(garage => garage.owner._id === userId);
            setMyGarages(myGarageList);
        };
        if (userId) fetchgarages();
      }, [userId, props.garages]);

      const newButtonClick = () => {
        props.toggleNewGarage()
      }

    return (
        <div className = "profile">
            <h1>{myGarages[0]?.owner.username}'s Garages</h1>
            <ul>
            {myGarages.map((garage) => (
                <>
                    <li key={garage._id}>
                    <Link to={`/${userId}/garages/${garage._id}`}>
                        <div>
                            <h2>{garage.name}</h2>
                        </div>
                    </Link>
                    </li>
                </>
            )
            )}
            </ul>
            <button onClick={newButtonClick}>Add a Garage</button>
        </div>
    )
}

export default Profile;