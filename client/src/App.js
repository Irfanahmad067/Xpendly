import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Test } from './pages/Test';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           
        </Routes>


      </BrowserRouter>
     
    </div>
  );

}

export function ProtectedRoute(props) {
  if(localStorage.getItem('track-it-user')){
    return props.children
  }else{
    return <Navigate to="/login"/>
  }
 
}

export default App;
