
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {login, logout} from './store/authSlice'
import authService from './appwrite/authServices';

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
    <>
      <h1 className="text-3xl font-bold underline text-center">
        Welcome to Our React Series with Chai aur Code
      </h1>
      
    </>
  ) : null  
}