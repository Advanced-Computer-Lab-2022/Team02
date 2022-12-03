import { Link } from 'react-router-dom'
import CountryCurrency from '../components/CountryCurrency'

const Navbar = () => {


    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Learning App
                    </h1>
                </Link>
                <CountryCurrency></CountryCurrency>
            </div>
        </header>
    )
}

export default Navbar