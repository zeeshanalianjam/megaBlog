import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/authServices'
import { login } from '../../store/authSlice'
import {Button, Input, Logo} from '../index'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigat = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session){
                const userData = authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                    navigat("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
<div className="mb-2 flex justify-center">
<span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
</div>
<h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} >
                    <Input 
                    label= "Name: "
                    type="text"
                    placeholder = "Enter you're name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    type= "email"
                    placeholder = "Enter you're email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchpatern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||  "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label= "Password"
                    type= "password"
                    placeholder= "Enter you're password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button type='submit' className='w-full'>Create Account</Button>
                </form>
        </div>
    </div>
  )
}

export default SignUp