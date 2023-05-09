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

  const { price, title } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        token: token,
        title: title,
        amount: price,
      });

      const stripeToken = stripeResponse.token.id;

      const responseFromBackend = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { stripeToken: stripeToken }
      );

      if (responseFromBackend.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {completed ? (
        <p>Paiement validé</p>
      ) : (
        <button type="submit" disabled={isLoading}>
          Payer
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
