import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateContext from './context/StateContext';
import Login from './component/Login';
import SignUp from './component/SignUp';


function App() {
  return (
   <>
   <StateContext>
   <BrowserRouter>
   <Navbar/>
      <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
    </StateContext>
   </>
  );
}

export default App;
