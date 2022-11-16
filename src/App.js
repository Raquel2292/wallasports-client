
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
import Detail from './pages/Detail';
import Upload from './pages/Upload';
import Favorites from './pages/Favorites';
import MyProducts from './pages/MyProducts';
import EditProduct from './pages/EditProduct';
import EditProfile from './pages/EditProfile';
import Messages from './pages/Messages';


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
    <Route path="/productsList/:type" element= { <IsPrivate> <ProductsList/> </IsPrivate> } />
    <Route path="/products/detail/:id" element= { <IsPrivate> <Detail/> </IsPrivate> } />
    <Route path="/upload" element= { <IsPrivate> <Upload/> </IsPrivate> } />
    <Route path='/favorites' element= {<IsPrivate> <Favorites/> </IsPrivate>}/>
    <Route path='/my-products' element= {<IsPrivate> <MyProducts/> </IsPrivate>}/>
    <Route path='/edit-products/:id' element= {<IsPrivate> <EditProduct/> </IsPrivate>}/>
    <Route path='/edit-profile' element= {<IsPrivate> <EditProfile/> </IsPrivate>}/>
    <Route path='/messages' element= {<IsPrivate> <Messages/> </IsPrivate>}/>



    <Route path="/error" element= { <Error/>}/>
    <Route path="/*" element= { <NotFound/>}/>


  </Routes>

    </div>
  );
}

export default App;
