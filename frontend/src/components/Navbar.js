import { Link } from 'react-router-dom'
import CountryCurrency from '../components/CountryCurrency'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const logoutt = async(e) => {
        await fetch('/guest/logout' , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        } )
        logout();
        window.location.href='../'
    }
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Learning App
                    </h1>
                </Link>
                <nav>
                <CountryCurrency></CountryCurrency>
                {user && (<div>
                <span>{user.id}</span>
                <button onClick={logoutt} >Logout</button>
                </div>)}
                {!user && (<div>
                <Link to="/">Login</Link>   
                <Link to="/SignUp">SignUp</Link>  
                </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar