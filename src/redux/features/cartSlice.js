import { createSlice } from '@reduxjs/toolkit';



const calculateTotals = (items) => {
    return items.reduce((totals, item) => ({
        quantity: totals.quantity + (item.quantity || item.qty),
        amount: totals.amount + (item.price * (item.quantity || item.qty))
    }), { quantity: 0, amount: 0 });
};

export const getLocalStorageItems = () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user'))?.email;
        if (!userId) {
            const cartItems = localStorage.getItem('cartItems_guest');
            return cartItems ? JSON.parse(cartItems) : [];
        }
        const cartItems = localStorage.getItem(`cartItems_${userId}`);
        return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
        console.error('Error loading cart:', error);
        return [];
    }
};

const initialState = {
    items: getLocalStorageItems(),
    totalAmount: 0,
    totalQuantity: 0,
    loading: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            localStorage.setItem(
                userId ? `cartItems_${userId}` : 'cartItems_guest',
                JSON.stringify(state.items)
            );
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            localStorage.setItem(
                userId ? `cartItems_${userId}` : 'cartItems_guest',
                JSON.stringify(state.items)
            );
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            localStorage.setItem(
                userId ? `cartItems_${userId}` : 'cartItems_guest',
                JSON.stringify(state.items)
            );
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;

            const userId = JSON.parse(localStorage.getItem('user'))?.email;
            localStorage.removeItem(userId ? `cartItems_${userId}` : 'cartItems_guest');
        },

        setToCard: (state, action) => {
            state.items = action.payload;
            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalAmount = totals.amount;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setToCard } = cartSlice.actions;
export default cartSlice.reducer;