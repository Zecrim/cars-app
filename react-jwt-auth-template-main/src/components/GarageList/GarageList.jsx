import { Link } from 'react-router-dom'
// import styles from './GarageList.module.css'

const GarageList = (props) => {
    return (
        <div className = "garage-list">
            <ul>
            {props.garages.map((garage) => (
                <li key={garage._id}>
                <Link to={`/${props.userId}/garages/${garage._id}`}>
                    <div>
                        <h2>{garage.name}</h2>
                    </div>
                </Link>
                <Link to={`/${garage.owner._id}`}>
                    <p>{garage.owner.username}</p>
                </Link>
                </li>
            )
            )}
            </ul>
        </div>
    )
}

export default GarageList;