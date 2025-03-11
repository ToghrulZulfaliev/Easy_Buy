import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { setAll } from '../../redux/features/authSlice';


const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            login_by: 'email'
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await fetch("https://ecommerce.ramil.dev/api/v2/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({
                        ...values,
                        login_by: "email"

                    })

                });


                const data = await response.json();



                if (data.result) {
                    resetForm();
                    dispatch(setAll({ access_token: data.access_token, user: data.user }));


                    setMessage({
                        type: 'success',
                        text: 'Login successful! Redirecting...'
                    });


                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                } else {
                    setMessage({
                        type: 'error',
                        text: data.message || 'Login failed'
                    });
                }
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: 'Network error occurred'
                });
            } finally {
                setSubmitting(false);
            }
        }
    });





    return (
        <div className="container my-3 py-3">
            <h1 className="text-center mt-5 pt-5">Login</h1>
            <hr />
            <div className="row my-4 h-100">
                <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                    {message.text && (
                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="email_or_phone">Email</label>
                            <input
                                autoComplete='off'
                                type="email"
                                className={`form-control ${formik.errors.email_or_phone && formik.touched.email_or_phone ? 'is-invalid' : ''}`}
                                id="email_or_phone"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter email"
                                disabled={formik.isSubmitting}
                            />
                            {formik.errors.email_or_phone && formik.touched.email_or_phone && (
                                <div className="invalid-feedback">{formik.errors.email_or_phone}</div>
                            )}
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`form-control ${formik.errors.password && formik.touched.password ? 'is-invalid' : ''}`}
                                id="password"
                                autoComplete='off'
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter password"
                                disabled={formik.isSubmitting}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="my-3">
                            <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link></p>
                        </div>

                        <div className="text-center">
                            <button
                                className="my-2 mx-auto btn btn-dark"
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;