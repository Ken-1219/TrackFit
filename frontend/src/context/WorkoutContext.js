import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "Set_Workouts":
            return {
                workouts: action.payload
            }
        case "Create_Workout":
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case "Delete_Workout":
            return{
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)  
            }
        default:
            return state;
    }
}


const WorkoutsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    return (
        <WorkoutsContext.Provider value={{ ...state , dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}

export default WorkoutsContextProvider;