import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CrewmateDetails from "./pages/CrewmateDetails";
import CrewmateGallery from "./pages/CrewmateGallery";
import NewCrewmate from "./pages/NewCrewmate";
import UpdateCrewmate from "./pages/UpdateCrewmate";
import SideNav from "./pages/SideNav";
import FloatingCrewmate from "./components/FloatingCrewmate";

const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/gallery",
      element: <CrewmateGallery />,
    },
    {
      path: "/gallery/details/:id",
      element: <CrewmateDetails />,
    },
    {
      path: "/edit/:id",
      element: <UpdateCrewmate />,
    },
    {
      path: "/gallery/details/:id/edit",
      element: <UpdateCrewmate />,
    },
    {
      path: "/gallery/edit/:id",
      element: <UpdateCrewmate />,
    },
    {
      path: "/new",
      element: <NewCrewmate />,
    },
  ]);

  return (
    <div className="App">
      <SideNav />
      {element}
      <FloatingCrewmate />
    </div>
  );
};

export default App;
