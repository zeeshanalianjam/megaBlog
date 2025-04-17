
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {login, logout} from './store/authSlice'
import authService from './appwrite/authServices';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null  
}