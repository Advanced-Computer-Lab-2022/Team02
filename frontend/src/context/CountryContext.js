import { createContext, useState } from 'react'
import Country from "../Country.json";
import Currency from "../Currency.json";
const [rate, setRate] = useState('')
const getRate = () =>{
    return(
        <p></p>
    )
}
export const AuthContextProvider = ({ children }) => 
{
    const getRate = () =>
    {

    }
    
    
    return (
      <AuthContext.Provider value={rate}>
        { children }
      </AuthContext.Provider>
    )
}
  
  