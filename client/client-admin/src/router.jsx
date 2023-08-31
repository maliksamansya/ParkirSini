import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Landlords from "./pages/Landlords.jsx";
import Customers from "./pages/Customers.jsx";
import ParkingSpaces from "./pages/ParkingSpaces.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/landlords",
        element: <Landlords />
      },
      {
        path: "/customers",
        element: <Customers />
      },
      {
        path: "/parking-spaces",
        element: <ParkingSpaces />
      },
    ]
  },
]);

export default router
