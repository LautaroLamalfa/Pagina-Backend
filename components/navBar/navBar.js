import './navBar.css';
import {NavLink} from 'react-router-dom'


export const NavBar = () => {
        return (
            <nav className="navbar">   
                <div className='navbar_logo'>
                    <NavLink to="/">
                        <img 
                            src='https://res.cloudinary.com/dpr3boqjf/image/upload/v1646669710/Logo_kr8syf.png' 
                            alt='Logo'/>
                    </NavLink>
                </div>

                <ul className='navbar_links'>
                    {/* <li>
                        <NavLink to="/">
                        Shop
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/shoppingcart" className="cart_link">
                        <i className='fas fa-shopping-cart'></i>
                            <span>
                                Cart
                                    <span className='cartlogo__badge'>0</span>
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
    )
}
