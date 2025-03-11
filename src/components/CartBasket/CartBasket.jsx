import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/features/CartSlice';
import './CartBasket.css';

export default function CartBasket() {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
    const shipping = 30;

    const handleQuantityChange = (id, delta) => {
        const item = items.find(item => item.id === id);
        if (item) {
            const newQuantity = Math.max(1, Math.min(99, item.quantity + delta));
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        <div className="cart-items-container">
                            {items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image-container">
                                        <img
                                            src={item.image}
                                            alt={item.title || item.name}
                                            className="item-image"
                                        />
                                    </div>

                                    <div className="item-details">
                                        <div className="item-info">
                                            <h3 className="item-name">
                                                {item.title || item.name}
                                            </h3>
                                            <p className="item-price">
                                                ${Number(item.price).toFixed(2)} per item
                                            </p>
                                        </div>

                                        <div className="item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="quantity-button"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="quantity-button"
                                                    disabled={item.quantity >= 99}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="total-price">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>

                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="remove-button"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="summary-section">
                        <div className="summary-container">
                            <h2 className="summary-title">Order Summary</h2>
                            <div className="summary-content">
                                <div className="summary-row">
                                    <span>Products ({totalQuantity})</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="summary-total">
                                    <div className="total-row">
                                        <span>Total</span>
                                        <span>${(totalAmount + shipping).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="checkout-button">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}