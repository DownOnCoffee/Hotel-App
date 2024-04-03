import "./App.css";
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateBooking from "./pages/CreateBooking/CreateBooking";
import { Toaster } from "react-hot-toast";
import ViewBooking from "./pages/ViewBooking/ViewBooking";

function App() {
  const location = useLocation();
  const style =  location.pathname === "/viewbooking"?" bg-opacity-30 ":"bg-opacity-20";
  return (
    <div className={`h-screen bg-white   ${style} `}>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path='/viewbooking' element={<ViewBooking></ViewBooking>}></Route> 
        <Route
          path="/addbooking"
          element={<CreateBooking></CreateBooking>}
        ></Route>
      </Routes>
      <Toaster
        toastOptions={{
          className: "",
          style: {
           
            padding: "10px",
            transitionDelay:"0"
            
          },
        }}
      ></Toaster>
    </div>
  );
}

export default App;
