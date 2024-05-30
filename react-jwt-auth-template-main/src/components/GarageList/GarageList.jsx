import { Link } from 'react-router-dom'
// import styles from './GarageList.module.css'

const GarageList = (props) => {
    return (
        <div className = "garageList">
            {props.garages.map((garage) => (
                <Link key={garage._id} to={`/${props.userId}/garages/${garage._id}`}>
                    <div>
                        <h2>{garage.name}</h2>
                    </div>
                </Link>
            )
            )}
        </div>
    )
}

export default GarageList;