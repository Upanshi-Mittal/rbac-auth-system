import './App.css';
import {Route,Routes,useNavigate} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Final from './components/final';
import RefreshHandler from './components/refreshhandler';
import { useState } from 'react';
function App() {
  const Navigate=useNavigate();
  const [isAutthenticated, setIsAutthenticated] = useState(false);
  const PrivateRoute=({element})=>{
    return isAutthenticated?element:<Navigate to="/login" />
  }
  return (
    <div className="App">
      <h1>
        Auth app
      </h1>
      <RefreshHandler setIsAuthenticated={setIsAutthenticated} />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/final" element={<PrivateRoute element={<Final />} /> } />
      </Routes>
    </div>
  );
}

export default App;
