import { useEffect, useState } from "react"
import ExerciseDetails from "../components/ExerciseDetails"
import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext";


const params = new URLSearchParams(window.location.search)
const courseID = params.get('courseId')

const GetExercises = () =>
{
    const [exercise,setexercise]= useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchExercises = async()=>{
            if(user!==null){
            await axios.get(`/indTrainee/exercises?courseId=${courseID}`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const f = res.data
                    console.log(res.data)
                    setexercise(f)
                    
                    
                }
                 );
            }
        }
        fetchExercises()
    }, [user])
    if(Array.isArray(exercise)){
        console.log(exercise[0])
    }
    return(
        <div className="home">
            <div className="Courses">
                {exercise && exercise.map((exercises)=>(
                    <ExerciseDetails key={exercises._id} exercises={exercises}/>

                ))}
            </div>
        </div>
    )
}

export default GetExercises