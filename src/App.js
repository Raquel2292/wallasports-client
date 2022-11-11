
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound'
import Profile from './pages/Profile';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">
  <Navbar/>

  <Routes>

    <Route path="/" element= { <Home/>}/>
    <Route path="/signup" element={ <Signup/> } />
    <Route path="/login" element= { <Login/> } />

    {/* paginas privadas */}
    <Route path="/profile" element= { <IsPrivate> <Profile/> </IsPrivate> } />

    <Route path="/error" element= { <Error/>}/>
    <Route path="/*" element= { <NotFound/>}/>


  </Routes>

    </div>
  );
}

export default App;
