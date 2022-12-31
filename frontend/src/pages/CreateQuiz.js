import QuesForm from "../components/QuesForm";
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

const QuizCrea = () => {
    let navigate=useNavigate()
    const {user} = useAuthContext()
    var t = 0;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    function BackToInstructor()
    {
        navigate('/Instructor')
    }
    useEffect(()=>{
        const fetchCourses = async()=>{
            if(user !== null){
            await fetch(`Instructor/createQuiz?courseId=${courseId}`, {
                       method: 'GET',
                       headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                   })
                }
        }
        
        fetchCourses()
    }, [user,courseId])

    return(
        <div className="admin">
            <QuesForm/>
            <button id="filterbutton" onClick={BackToInstructor}>create exam</button>
        </div>
        

    )



}
export default QuizCrea