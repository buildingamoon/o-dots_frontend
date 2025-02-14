<template>
  <div>
    <button @click.prevent="redirectToStripe">Pay</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#imports';
import { loadStripe } from '@stripe/stripe-js';



const runtimeConfig = useRuntimeConfig();

const redirectToStripe = async () => {
  try {
    const response = await fetch(`${runtimeConfig.public.apiBase}/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: 'Some Name',
        price: 1000,
        quantity: 1,
        successUrl: 'https://www.o-dots.com/payments/success?session_id={CHECKOUT_SESSION_ID}',
        failUrl: 'https://www.o-dots.com/payments/fail',
      }),
    });



    const data = await response.json();
    // const stripe = await loadStripe(runtimeConfig.public.stripeTestKey);
   const stripe = await loadStripe(runtimeConfig.public.stripePublishKey);
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error('Error during redirect to Stripe:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};
</script>
