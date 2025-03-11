import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/features/CartSlice';
import { styled } from '@mui/material';

export default function CartBasket() {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
    const shipping = 30;

    const handleQuantityChange = (id, delta) => {
        const item = items.find(item => item.id === id);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + delta);
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="max-w-5xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
            {items.length === 0 ? (
                <div className="text-center py-8">
                    <p style={{ marginTop: '2.5rem' }} className="text-xl text-gray-600">
                        Your cart is empty
                    </p>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Products</h2>
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-gray-50">
                                <div className="w-16 h-16 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain rounded-md"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                                    <p className="text-gray-600">
                                        <span className="font-bold">${item.price}</span> × {item.quantity}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center bg-white rounded-lg border">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:w-1/3 h-fit p-4 bg-gray-100 rounded-lg sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <p className="flex justify-between text-gray-600">
                                <span>Products ({totalQuantity})</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </p>
                            <p className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </p>
                            <div className="border-t pt-3">
                                <p className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${(totalAmount + shipping).toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                        <button className="w-full mt-6 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
}