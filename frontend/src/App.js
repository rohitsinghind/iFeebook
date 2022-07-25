import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './screens/login';
import Signup from './screens/signup';
import Home from './screens/home';
import MobileAddStudent from './screens/mobileScreens/mobileAddStudent';
import MobileHome from './screens/mobileScreens/mobileHome';
import MobileStudentDetails from './screens/mobileScreens/mobileStudentDetails';

function App() {

  const mediaQuery = window.matchMedia("(max-width: 550px)");
  const [student, setStudent] = useState(null)
  
  return (mediaQuery.matches?
    <>
      <Router>
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={ localStorage.getItem('token')?<MobileHome setStudent={setStudent}/>:<Login />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />
        <Route 
          path="/add" 
          element={localStorage.getItem('token')?<MobileAddStudent/>:<Login />} 
        />
        <Route 
          path="/studentDetails" 
          element={localStorage.getItem('token')?<MobileStudentDetails student={student}/>:<Login />} 
        />
        </Routes>
        <Footer/>
    </Router>
    </>
    :
    <>
      <Router>
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={ localStorage.getItem('token')?<Home/>:<Login />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />
        </Routes>
        <Footer/>
    </Router>
    </>
  )
}

export default App;
