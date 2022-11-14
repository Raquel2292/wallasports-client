
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
import ProductsList from './pages/ProductsList';
import Details from './pages/Details';
import Upload from './pages/Upload';
import Favorites from './pages/Favorites';
import List from './components/List';


function App() {
  return (
    <div className="App">
  <Navbar/>

  <Routes>

    <Route path="/signup" element={ <Signup/> } />
    <Route path="/login" element= { <Login/> } />
    

    {/* paginas privadas */}
    <Route path="/" element= { <IsPrivate> <Home/> </IsPrivate> }/>
    <Route path="/profile" element= { <IsPrivate> <Profile/> </IsPrivate> } />
    <Route path="/productsList" element= { <IsPrivate> <ProductsList/> </IsPrivate> } />
    <Route path="/details" element= { <IsPrivate> <Details/> </IsPrivate> } />
    <Route path="/upload" element= { <IsPrivate> <Upload/> </IsPrivate> } />
    <Route path='/favorites' element= {<IsPrivate> <Favorites/> </IsPrivate>}/>
    <Route path='/list' element= {<IsPrivate> <List/> </IsPrivate>}/>


    <Route path="/error" element= { <Error/>}/>
    <Route path="/*" element= { <NotFound/>}/>


  </Routes>

    </div>
  );
}

export default App;
