import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null); //reset the error to null
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if (response.ok) {
            //save the user to loacl storage --> This is done to keep the JWT token on the browser until the token expires
            localStorage.setItem('user', JSON.stringify(json));

            //update the AUTHCONTEXT
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);

        }
    }

    return {login, isLoading, error };
}

