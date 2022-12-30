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
                    <h3>
                        Learning App
                        
                    </h3>
                <nav>
                
                <CountryCurrency></CountryCurrency>
                {user && (<div>
                <h3 id="f">{user.email}</h3>
                <a id="f" onClick={logoutt}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Logout
                </a>
                </div>)}
                {!user && (<div>
                
                <Link id="f" to="/">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                    </Link>   
                <Link id="f" to="/SignUp">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    SignUp
                    </Link>  
                </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar