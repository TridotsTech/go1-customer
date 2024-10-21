<template>
    <div class="number-card">
      <div class="card-content text-gray-700">
        <h4><b>OUTSTANDING INVOICES</b></h4>
        <p class="currency">
          {{ totalOutstanding ? formatCurrency(totalOutstanding) : 0 }}
        </p>
        <p class v-if="invoiceCount">Pending Invoices: {{ invoiceCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const totalOutstanding = ref(0);
      const invoiceCount = ref(0);
  
      const fetchOutstandingInvoices = async () => {
        try {
          const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.outstanding_invoices');
          const data = await response.json();
  
          if (data.message) {
            totalOutstanding.value = data.message.total_outstanding;
            invoiceCount.value = data.message.invoice_count;
          } else {
            console.error('No data received from API');
          }
        } catch (error) {
          console.error('Error fetching outstanding invoices:', error);
        }
      };
  
      const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(value);
      };
  
      onMounted(() => {
        fetchOutstandingInvoices();
      });
  
      return {
        totalOutstanding,
        invoiceCount,
        formatCurrency,
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
    /* width: 242px; */
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
    font-size: 12px;
    margin: 0;
    color: green;
  }
  </style>
  