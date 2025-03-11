import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/CartSlice';
import './BuyNow.css';

const BuyNow = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mb-4 mt-5 pt-5">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid product-image"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-muted mb-3">{product.category}</h4>
                    <h1 className="mb-4 mt-5 pt-5">{product.title}</h1>
                    <div className="d-flex align-items-center mb-3">
                        <span className="h5 mb-0 me-2">{product.rating.rate}</span>
                        <i className="fa fa-star text-warning"></i>
                        <span className="text-muted ms-2">({product.rating.count} reviews)</span>
                    </div>
                    <h2 className="h1 mb-4">${product.price.toFixed(2)}</h2>
                    <p className="lead mb-4">{product.description}</p>
                    <div className="d-flex gap-3">
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-dark px-4 py-2"
                        >
                            Add to Cart
                        </button>
                        <Link
                            to="/products"
                            className="btn btn-outline-dark px-4 py-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;