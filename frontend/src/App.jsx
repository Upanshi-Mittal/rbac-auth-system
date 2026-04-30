import './App.css';
import {Route,Routes,useNavigate} from "react-router-dom";
import Login from './page/login';
import Signup from './page/signup';
import Home from './page/home';
import Final from './page/final';
import RefreshHandler from './page/refreshhandler';
import { useState } from 'react';
function App() {
  const Navigate=useNavigate();
  const [isAutthenticated, setIsAutthenticated] = useState(false);
  const PrivateRoute=({element})=>{
    return isAutthenticated?element:<Navigate to="/login" />
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAutthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/final" element={<PrivateRoute element={<Final />} /> } />
      </Routes>
    </div>
  );
}

export default App;
