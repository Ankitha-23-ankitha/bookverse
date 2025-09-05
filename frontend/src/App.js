import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Explore from './components/Explore';
import Book from './components/Book';
import Register from './components/Register';
import Login from './components/Login';
import { UserContext } from './ContextApi/UserContext'
import Cart from './components/Cart';
import Users from './components/Users';
import Start from './components/Start';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
import AboutUs from './components/AboutUs';
import Verify from './components/Verify';
import Orders from './components/Orders';
import Checkout from './components/Checkout';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Runs whenever the route changes

  return null;
};


function App() {

  // const baseUrl = 'https://bookverse-0lcf.onrender.com/'
  const baseUrl = 'http://localhost:3001/'
  const [username, setUsername] = React.useState('')
  const [token, setToken] = React.useState('')
  const [name, setName] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [input, setInput] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState('false');
  const [selectValue, setSelectValue] = React.useState({value: 'All', label: 'All'});  


  React.useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedUserId = localStorage.getItem("userId");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedName)     setName(storedName);
    if (storedToken)      setToken(storedToken);
    if (storedUsername)   setUsername(storedUsername);
    if (storedUserId)   setUserId(storedUserId);
    if (storedIsAdmin)   setIsAdmin(storedIsAdmin);
  }, []);

  return (
    <UserContext.Provider 
      value={{username, setUsername, token, setToken, name, setName, setUserId, userId, input, setInput, selectValue, setSelectValue, isAdmin, setIsAdmin}}
    >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={ <Start baseUrl={baseUrl} /> } />
          <Route path='/bookverse' element={ <Layout baseUrl={baseUrl} /> } >
            <Route path='/bookverse' element={ <Home baseUrl={baseUrl} /> } />
            <Route path='/bookverse/explore' element={ <Explore baseUrl={baseUrl} /> } >
              <Route path='/bookverse/explore/' element={ <SearchResults input={input} baseUrl={baseUrl} /> } />
              <Route path='/bookverse/explore/:bookName' element={ <Book baseUrl={baseUrl} /> } />
              <Route path='/bookverse/explore/cart' element={ <Cart baseUrl={baseUrl} /> } />
            </Route>
            <Route path='/bookverse/users' element={ <Users baseUrl={baseUrl} /> } />
            <Route path='/bookverse/profile/:username' element={ <Profile baseUrl={baseUrl} /> } />
            <Route path='/bookverse/about' element={ <AboutUs baseUrl={baseUrl} /> } />
            <Route path='/bookverse/login' element={ <Login baseUrl={baseUrl} /> } />
            <Route path='/bookverse/register' element={ <Register baseUrl={baseUrl} /> } />
            <Route path='/bookverse/verify' element={ <Verify baseUrl={baseUrl} /> } />
            <Route path='/bookverse/orders' element={ <Orders baseUrl={baseUrl} /> } />
            <Route path='/bookverse/checkout' element={ <Checkout baseUrl={baseUrl} /> } />
          </Route>
          <Route path='/*' element={ <Layout /> } />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
