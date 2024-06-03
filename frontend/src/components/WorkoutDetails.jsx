import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext';

import { formatDistanceToNow } from 'date-fns';
//it receives props from the Home page where it is called
function WorkoutDetails({ workout }) {

    const {dispatch} = useWorkoutContext();
    const { user } = useAuthContext();

    if(!user){
        return
    }

    const handleClick = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/` + workout._id,{
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok){
            dispatch({
                type: "Delete_Workout",
                payload: json
            })
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Resps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
            
        </div>
    )
}

export default WorkoutDetails;