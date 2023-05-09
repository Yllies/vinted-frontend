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
  console.log(price);
  console.log(title);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: token,
      });

      const stripeToken = stripeResponse.token.id;

      const responseFromBackend = await axios.post(
        "http://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, title: title, amount: price }
      );

      if (responseFromBackend.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
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
