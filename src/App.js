
import './App.css';
import {Routes,Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import { AppProvider } from './context/appContext';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';





function App() {
 

  return (
    <AppProvider>
       <Routes>
      <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </AppProvider>
   
  );
}

export default App;
