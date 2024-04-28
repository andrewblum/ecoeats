import './App.css';
import Homepage from './Homepage.jsx';
import Login from './Login.jsx';
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
  fetch('/api/json-test')
    .then((resp) => resp.json())
    .then((data) => console.log(data));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
