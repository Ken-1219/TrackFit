import { useAuthContext } from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();

    const logout = () => {
        //remove user form local storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'Set_Workouts', payload: null })
    }
    return { logout };
}
