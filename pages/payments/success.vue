<template>
    <div>
        <div v-if="loading">
              <h1>確認中....</h1>
        </div>
        <div v-else-if="paymentStatus=='success'">
            <h1>你的訂單已被確認!</h1>
            {{  sessionDetails.metadata }}
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