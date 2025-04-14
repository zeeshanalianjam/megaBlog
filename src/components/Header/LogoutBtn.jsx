import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/authServices'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
        .then(() => dispatch( logout() ))
        .catch((error) => console.log(error))

    }
  return (
    <butto className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</butto>
  )
}

export default LogoutBtn