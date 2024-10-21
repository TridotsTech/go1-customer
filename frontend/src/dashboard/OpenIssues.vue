<template>
    <div class="number-card">
      <div class="card-content text-gray-700">
        <h4><b>OPEN ISSUES</b></h4>
        <p class="count">
          {{ openIssuesCount ? openIssuesCount : 0 }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const openIssuesCount = ref(0);
  
      const fetchOpenIssues = async () => {
        try {
          const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.open_issues');
          const data = await response.json();
  
          if (data.message) {
            openIssuesCount.value = data.message.open_issues_count;
          } else {
            console.error('No data received from API');
          }
        } catch (error) {
          console.error('Error fetching open issues:', error);
        }
      };
  
      onMounted(() => {
        fetchOpenIssues();
      });
  
      return {
        openIssuesCount,
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
  
  .count {
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
  