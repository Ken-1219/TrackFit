import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';


function Home() {

    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            //connecting to backend using the fetch api
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //since the proxy has been set in package.json file, we need only relative path
            const json = await response.json();

            if (response.ok) {
                dispatch({
                    type: "Set_Workouts",
                    payload: json
                })
            }
        }

        if (user) {
            fetchWorkouts();
        }

    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                <div className="details">
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
                </div>
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home;