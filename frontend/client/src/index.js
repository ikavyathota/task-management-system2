import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <UserProvider>
            <TaskProvider>
                <App />
            </TaskProvider>
        </UserProvider>
    </React.StrictMode>
);
