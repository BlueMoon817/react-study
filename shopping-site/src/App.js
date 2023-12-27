import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/Navbar';

function App() {
  const PrivatePage=()=>{
    return
  }
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/:id" element={<PrivatePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
