import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { WorkoutsContextProvider } from './context/WorkoutContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <WorkoutsContextProvider>
        <App />
    </WorkoutsContextProvider>
);

