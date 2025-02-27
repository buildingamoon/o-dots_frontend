<template>
    <Mainheader/>
    <div class='paymentsucess'>
        <div v-if="loading">
              <h1>Processing your payment....</h1>
        </div>
        <div v-else-if="paymentStatus=='success'">
            <h1>Payment Success! </h1>
            <img src='/public/picture/logowordbg.png'>
            Name: {{  sessionDetails.metadata.name }}

            items purchased: {{  sessionDetails.metadata.productName }}

            Price: {{  sessionDetails.metadata.formatPrice(price) }}

            Reference ID: {{  sessionDetails.metadata.bookingid }}
            <h3>Start your journey now! Your subscription could be found <a href='https://o-dots.com/courses/mycourses'>HERE</a>
            </h3>
        </div>
    </div>
 </template>
 
 
 <script setup>
 
 
 
 
    const loading = ref(true);
    const sessionDetails = ref(null);
    const paymentStatus = ref(null);
 
 
    const { query } = useRoute();
    const sessionId = query.session_id;
 
 
    const runtimeConfig = useRuntimeConfig();
 
 
    const fetchSessionDetails = async () => {
        try {
            const sessionId = query.session_id;
       
            if (sessionId) {
                    const response = await fetch(runtimeConfig.public.apiBase + `/payments/session-details?sessionId=${sessionId}`);
                    const data = await response.json();
                   
                    sessionDetails.value = data.session;
                    paymentStatus.value = data.paymentStatus;
             }
        } catch (error) {
            console.error('Error fetching session details:', error);
        } finally {
            loading.value = false;
        }
    };
 
 
    onMounted(() => {
      fetchSessionDetails()
    })
 
 
   
 </script>

 <style>
.paymentsucess{
    height:100%;
    width:100%;
    padding:0;
    margin:0;
    
}
a{
    text-decoration: none;
    color:yellow;
    font-size:1.5em;
    font-weight:600;

}
</style>