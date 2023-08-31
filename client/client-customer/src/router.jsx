import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LandlordListings from "./pages/LandlordListings.jsx";
import AddListingPage from "./pages/AddListingPage";
import ThankYouListing from "./pages/ThankYouListing.jsx";
import ThankYouPayment from "./pages/ThankYouPayment.jsx";
import LocationComponent from "./pages/MapLocation";
import CustomerRent from "./pages/CustomerRent.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import RentalApproval from "./pages/RentalApproval.jsx";
import DashboardLandlord from "./pages/DashboardLandlord.jsx";
import LoginPageCustomer from "./pages/LoginPageCustomer.jsx";
import RegisterPageCustomer from "./pages/RegisterPageCustomer.jsx";
import RentalList from "./pages/RentalList.jsx";
import TalkJsInbox from "./pages/TalkJsInbox";

import About from "./pages/About.jsx";

import EmptyPage from "./pages/EmptyPage.jsx";

function guard() {
  let token = localStorage.getItem("access_token");
  if (!token) {
    return redirect("/empty");
  }
  return null;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
      {
        path: "/empty",
        element: <EmptyPage />,
      },
      {
        path: "/landlordListings",
        element: <LandlordListings />,
        loader: guard,
      },
      {
        path: "/landlordListings/:id",
        element: <LandlordListings />,
        loader: guard,
      },
      {
        path: "/add-listing",
        element: <AddListingPage />,
        loader: guard,
      },
      {
        path: "/thankyou-listing",
        element: <ThankYouListing />,
        loader: guard,
      },
      {
        path: "/thankyou-payment",
        element: <ThankYouPayment />,
        loader: guard,
      },
      {
        path: "/location",
        element: <LocationComponent />,
        loader: guard,
      },
      {
        path: "/rented",
        element: <CustomerRent />,
        loader: guard,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/loginCustomer",
        element: <LoginPageCustomer />,
      },
      {
        path: "/reg",
        element: <RegisterPage />,
      },
      {
        path: "/regCustomer",
        element: <RegisterPageCustomer />,
      },
      {
        path: "/approval",
        element: <RentalApproval />,
        loader: guard,
      },
      {
        path: "/dashboard-landlord",
        element: <DashboardLandlord />,
        loader: guard,
      },
      {
        path: "/rental-list/:id",
        element: <RentalList />,
        loader: guard,
      },
      {
        path: "/inbox",
        element: <TalkJsInbox />,
        loader: guard,
      },
      {
        path: "/about",
        element: <About />
      },
    ],
  },
]);

export default router;
