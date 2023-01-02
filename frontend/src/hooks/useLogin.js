import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {useNavigate} from 'react-router-dom'

export const useLogin = () => {
    let navigate = useNavigate();
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(UserName,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/guest/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({UserName,password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type:'LOGIN',payload:json})

            setIsLoading(false)
                if(json.accepted == 1){
                 if(json.nav === "1")
                  navigate('/admin')
                 if(json.nav === "2")
                   navigate('/Instructor')
                 if(json.nav === "3")
                    navigate('/InTrainee')
                  if(json.nav === "4")
                 navigate('/CorTrainee')}
                 else{
                    if(json.nav == "1")
                    {
                        navigate('/admin')
                    }
                    else
                       navigate('/Policy')
                 }
        }
    }
    return{login,isLoading,error}
}