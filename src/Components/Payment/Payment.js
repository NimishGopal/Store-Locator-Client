import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class Payment extends React.Component {
    render() {
        const onSuccess = (payment) => {
            		console.log("The payment was succeeded!", payment);
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; 
        let currency = 'INR'; 
        let total = 0.50;
        
        const client = {
            sandbox:    'AU4LB-8cQ9wXEFc0fGSSEL7Em-nKurbGpEGJNrsUSNr8wcwNSUfC7ZUdEUMLr_OePFpwzionyxWHz5N8',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}