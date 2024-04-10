import axios from 'axios';
import React from 'react';
import Razorpay from 'react-razorpay';

const App = () => {
const handlePaymentSuccess = (payment) => {
console.log('Payment Successful:', payment);
};

const handlePaymentError = (error) => {
console.log('Payment Error:', error);
};

const handlePaymentCancel = () => {
console.log('Payment Cancelled');
};

const createOrder = async () => {
try {
const response = await fetch('/create-order', { method: 'POST' });
const order = await response.json();
const options = {
key: 'YOUR_KEY_ID',
amount: order.amount,
currency: order.currency,
name: 'Your Company Name',
description: 'Test Payment',
order_id: order.id,
handler: handlePaymentSuccess,
prefill: {
name: 'John Doe',
email: 'john.doe@example.com',
contact: '9876543210',
},
theme: {
color: '#F37254',
},
modal: {
ondismiss: handlePaymentCancel,
},
};
const razorpayInstance = new window.Razorpay(options);
razorpayInstance.open();
} catch (error) {
console.log('Failed to create order:', error);
}
};

return (


);
};