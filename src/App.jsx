import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/profile";

function App() {
  return (
    <>
        <BrowserRouter basename="/">
          <Routes>
            {/* Body is a parent route & inside it childs, controlled by Outet */}
            <Route path="/" element={<Body/>}> 
               <Route path="/profile" element={<Profile/>} />
               <Route path="/login" element={<Login/>} />
            </Route>
          </Routes>
        </BrowserRouter>

      {/* <h1 className="bg-amber-800">Vite + React</h1> */}
    </>
  );
}

export default App;
