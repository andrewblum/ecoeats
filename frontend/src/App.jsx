import './App.css';
import Homepage from './Homepage.jsx';
import Login from './components/app/Login.jsx';
import ErrorPage from './ErrorPage.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/homepage',
    element: <Homepage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
