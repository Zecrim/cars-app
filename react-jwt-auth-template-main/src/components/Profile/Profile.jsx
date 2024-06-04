import { Link } from 'react-router-dom'
// import styles from './GarageList.module.css'

// useEffect(() => {
//     const fetchgarage = async () => {
//       const carData = await garageService.show(userId, garageId, carId);
//       setFormData(carData.comments.find((comment) => comment._id === props.comment._id));
//     };
//     if (props.carId && props.comment_id) fetchComment();
//   }, [userId, garageId, carId, props.comment_id]);

const Profile = (props) => {
    // const currentGarages = props.garages.filter((garage) => )
    return (
        <div className = "profile">
            <ul>
            {props.garages.map((garage) => (
                <li key={garage._id}>
                <Link to={`/${props.userId}/garages/${garage._id}`}>
                    <div>
                        <h2>{garage.name}</h2>
                        <p>{garage.owner.username}</p>
                    </div>
                </Link>
                </li>
            )
            )}
            </ul>
        </div>
    )
}

export default Profile;