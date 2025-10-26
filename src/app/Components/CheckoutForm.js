

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({setIsPaid,setIsToastOpen,setToastData,setToastType}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: 'https://your-site.com/order-success', // optional redirect
      },
      redirect: 'if_required' 
    });

    if (error) {
    //   console.error('❌ Payment failed:', error.message);
    setIsToastOpen(true)
    setToastData('Payment Could Not Be Process Please Try Again')
    setToastType('error')
    // setIsPaid(false)    
} else if (paymentIntent?.status === 'succeeded') {
      setIsToastOpen(true)
    //   setIsToast(true)
      setToastData('Payment Has Been Sucessfull Ad Will Be Approved Shortly')
      setToastType('success')  
      setIsPaid(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm