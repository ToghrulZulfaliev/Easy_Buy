import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../../redux/features/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const { user } = useSelector(state => state.auth);
    const { totalQuantity } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/login');
        dispatch(clearAll());
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='position-fixed w-100 top-0' style={{ zIndex: 10 }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div className="container">
                    <Link
                        className="navbar-brand fw-bold fs-4 px-2"
                        to="/"
                        onClick={() => setActiveLink('/')}
                    >
                        EasyBuy
                    </Link>
                    <button
                        onClick={toggle}
                        className="navbar-toggler mx-2"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav m-auto my-2 text-center">
                            <li className="nav-link">
                                <Link
                                    className={`nav ${activeLink === '/' ? 'active' : ''}`}
                                    to="/"
                                    onClick={() => setActiveLink('/')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link
                                    className={`nav ${activeLink === '/products' ? 'active' : ''}`}
                                    to="/products"
                                    onClick={() => setActiveLink('/products')}
                                >
                                    Products
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link
                                    className={`nav ${activeLink === '/about' ? 'active' : ''}`}
                                    to="/about"
                                    onClick={() => setActiveLink('/about')}
                                >
                                    About
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link
                                    className={`nav ${activeLink === '/contact' ? 'active' : ''}`}
                                    to="/contact"
                                    onClick={() => setActiveLink('/contact')}
                                >
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                        <div className="buttons text-center">
                            {user ? (
                                <>
                                    <span className="me-3 user-name">Welcome, {user.name || user.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline-dark m-2"
                                    >
                                        <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                    </button>
                                    <Link to="/cart" className="btn btn-outline-dark m-2">
                                        <i className="fa fa-shopping-cart"></i> Cart ({totalQuantity})
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline-dark m-2">
                                        <i className="fa fa-sign-in-alt mr-1"></i> Login
                                    </Link>
                                    <Link to="/register" className="btn btn-outline-dark m-2">
                                        <i className="fa fa-user-plus mr-1"></i> Register
                                    </Link>
                                    <Link to="/cartbasket" className="btn btn-outline-dark m-2">
                                        <i className="fa fa-shopping-cart"></i> Cart ({totalQuantity})
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;