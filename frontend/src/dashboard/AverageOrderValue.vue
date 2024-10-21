<template>
  <div class="number-card">
      <div class="card-content text-gray-700">
      <h4><b>AVERAGE ORDER VALUE</b></h4>
      <p class="currency">
          {{ typeof averageOrderValue === 'number' && averageOrderValue > 0 ? formatCurrency(averageOrderValue) : '0' }}
      </p>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
setup() {
  const averageOrderValue = ref(null);

  const fetchAverageOrderValue = async () => {
  try {
      const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.average_order_value');
      const data = await response.json();
      if (typeof data.message === 'number') {
          averageOrderValue.value = data.message;
      } else {
          averageOrderValue.value = 0;  
      }
  } catch (error) {
      console.error('Error fetching Average Order Value:', error);
      averageOrderValue.value = 0;  
  }
  };

  const formatCurrency = (value) => {
  return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  onMounted(() => {
      fetchAverageOrderValue();
    });

  return {
  averageOrderValue,
  formatCurrency
  };
},
};
</script>

<style scoped>
.number-card {
background-color: #fff;
border: 1px solid #eaeaea;
border-radius: 10px;
padding: 20px;
text-align: left;
height: 100px;
}

.card-content h4 {
font-size: 10px;
}

.currency {
font-size: 15px;
font-weight: bold;
color: #000000;
}

p {
font-size: 13px;
margin: 0;
color: #4F75FF;
}
</style>
