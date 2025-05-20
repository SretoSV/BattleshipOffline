import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
/*pages*/
import { Battleship } from './pages/Battleship.tsx';
/*dnd*/
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Battleship />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  },
]);

createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <RouterProvider router={router} />
  </DndProvider>,
)
