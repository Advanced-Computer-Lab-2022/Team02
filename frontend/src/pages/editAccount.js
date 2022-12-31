import { useState,useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const EditAccount = () => {

    const[email,setEmail] = useState('')
    const [info,setInfo] = useState(null)
    const[biography,setBio] = useState('')
    const[password,setPassword] = useState('')
    const [error,SetError] = useState(null)
    const [error1,SetError1] = useState(null)
    const [error2,SetError2] = useState(null)
    const [rating, setRating] = useState([]);
    const [reviews, setReviews] = useState([]);
    const {user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const insId = params.get('Id');
    console.log(insId);

    useEffect(()=>{
        const getAccount = async() => {
            const response = await fetch('../Instructor/fetchAccount', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            console.log(json)
            if (response.ok){
                setInfo(json)
            }
        }
        const getRating = async() => {
            const response = await fetch(`/Instructor/getMyRating`,{
                headers:{"Authorization": `Bearer ${user.token}`}
            })
            const rate = await response.json()
            console.log(rate);
            if(response.ok)
            {
                setRating(rate)
            }
        }
        const getReviews = async() => {
            const response = await fetch(`/Instructor/getMyReviews`,{
                headers:{"Authorization": `Bearer ${user.token}`}
            })
            const review = await response.json()
            console.log(review);
            if(response.ok)
            {
                setReviews(review)
            }
        }
        if(user){
            getAccount();
            getRating()
            getReviews()
        }
        }, [user])
        const handleSubmit1 = async (e) => {
        e.preventDefault()

        const instructor = {email}


        const response = await fetch(`../Instructor/editEmail`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setEmail('')
            SetError(null)
            alert('Email Edited')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const instructor = {biography}


        const response = await fetch(`../Instructor/editBio`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError1()
        }
        if (response.ok){
            setBio('')
            SetError1(null)
            alert('Biography Edited')
            console.log('Changes Done')
        }
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault()

        const instructor = {password}


        const response = await fetch(`../Instructor/changePassword`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError2()
        }
        if (response.ok){
            setPassword('')
            SetError2(null)
            console.log('Changes Done')
        }
    }
    function average(nums) {
        if(nums.length>0)
            return nums.reduce((a, b) => (a + b)) / nums.length;
    }
    return(
        <div>
        {info && <div>
            <p id="account"><strong>Email:</strong>{info.email}</p>
            <p id="account" type="password"><strong>Password:</strong>{info.password}</p>
            <p id="account"><strong>Username:</strong>{info.username}</p>
            <p id="account"><strong>Biography:</strong>{info.biography}</p>
            <p id="account"><strong>My Rating:</strong>{average(rating)}</p>
            <p id="account"><strong>My Reviews:</strong>{reviews.join('-')}</p>
            </div>}
        <form className="Edit" onSubmit={handleSubmit1}>
            <h3>Edit Account</h3>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            />
            <button id="filterbutton">Edit Email</button>
            {error && <div className="error">{error}</div>}
        </form>
        <form className="Edit" onSubmit={handleSubmit}>
            <h3>Edit Biography</h3>
            <label>Biography:</label>
            <input
                type="text"
                onChange={(e)=> setBio(e.target.value)}
                value={biography}
            />

            <button id="filterbutton">Edit Biography</button>
            {error && <div className="error">{error1}</div>}
        </form>
        <form className="Edit" onSubmit={handleSubmit2}>
            <h3>Change Password</h3>
            <label>New Password:</label>
            <input
                type="text"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            />

            <button id="filterbutton">Change Password</button>
            {error && <div className="error">{error2}</div>}
        </form>

        </div>
        

    )
    


}
export default EditAccount

