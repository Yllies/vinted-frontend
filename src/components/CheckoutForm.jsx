import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const { price, title, description, username } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Payment</h1>
      <button type="submit">Payer</button>
    </form>
  );
};

export default CheckoutForm;
