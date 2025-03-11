import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });

    const { values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting } = useFormik({
        initialValues: {
            name: '',
            email_or_phone: '',
            password: '',
            register_by: 'email'
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .required('Name is required'),
            email_or_phone: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),

        onSubmit: async (values) => {
            try {
                const response = await fetch("https://ecommerce.ramil.dev/api/v2/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({
                        ...values,
                        register_by: "email"
                    })
                });

                const data = await response.json();

                if (data.result) {
                    // Store in localStorage
                    localStorage.setItem('user', JSON.stringify({
                        name: values.name,
                        email: values.email_or_phone,
                        isRegistered: true
                    }));

                    setMessage({
                        type: 'success',
                        text: 'Registration successful! Redirecting to login...'
                    });

                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    setMessage({
                        type: 'error',
                        text: data.message || 'Registration failed'
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
        },
    });

    return (
        <div className="container my-3 py-3">
            <h1 className="text-center mt-5 pt-5">Register</h1>
            <hr />
            <div className="row my-4 h-100">
                <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                    {message.text && (
                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                disabled={isSubmitting}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="email_or_phone">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email_or_phone ? 'is-invalid' : ''}`}
                                id="email_or_phone"
                                name="email_or_phone"
                                value={values.email_or_phone}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                disabled={isSubmitting}
                            />
                            {errors.email_or_phone && <div className="invalid-feedback">{errors.email_or_phone}</div>}
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                disabled={isSubmitting}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="my-3">
                            <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                        </div>

                        <div className="text-center">
                            <button
                                className="my-2 mx-auto btn btn-dark"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;