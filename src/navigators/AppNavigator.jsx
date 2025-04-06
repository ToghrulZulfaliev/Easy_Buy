import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPages from '../pages/CartPages';

import BuyPage from '../pages/BuyPage';
import { GetFromLocalStorage } from '../utils/storages/LocalStorage';
import { setUser } from '../redux/features/authSlice';
import { getLocalStorageItems, setToCard } from '../redux/features/CartSlice';



const AppNavigator = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);



    useEffect(() => {
        const checkUser = async () => {
            try {
                const access_token = GetFromLocalStorage('access_token');
                if (!access_token) return;

                const response = await fetch("https://ecommerce.ramil.dev/api/v2/get-user-by-access_token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token })
                });

                const data = await response.json();
                if (data.result) {
                    dispatch(setUser(data));
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        };

        checkUser();
    }, [dispatch]);

    useEffect(() => {
        dispatch(setToCard(getLocalStorageItems(user?.email)));
    }, [user])


    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="product/:id" element={<BuyPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cartbasket" element={<CartPages />} />
                <Route path="*" element={
                    <div className="container text-center py-5 mt-5">
                        <h1 style={{ marginTop: 30 }}>404 - Page Not Found</h1>
                        <p>The page you are looking for doesn't exist.</p>
                    </div>
                } />
            </Route>
        </Routes >
    );
};

export default AppNavigator;