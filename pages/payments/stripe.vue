<template>
  <div>
    <button @click.prevent="redirectToStripe">Pay</button>
  </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';
const runtimeConfig = useRuntimeConfig();

const redirectToStripe = async () => {
  try {
    const response = await fetch(runtimeConfig.public.apiBase + '/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'O-dots!',
        price: 1000,
        quantity: 1,
        successUrl: "https://o-dots/payments/success?session_id={CHECKOUT_SESSION_ID}",
        failUrl: "https://https://o-dots/payments/fail",
      })
    });

    const data = await response.json();
    console.log(data); // Log the response to check the session ID

    const stripe = await loadStripe(runtimeConfig.public.stripeTestKey);
    //const stripe = await loadStripe(runtimeConfig.public.stripePublishKey);
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } else {
      console.error("Stripe initialization failed");
    }
  } catch (error) {
    console.error("Error during redirect to Stripe:", error);
  }
};
</script>
