<template>
  <div class="flex justify-center items-center text-center">
    <DoughnutChart :data="chartData" :options="options" v-if="chartData.labels && chartData.labels.length > 0" />
    <p class="text-[12px] mb-16 text-gray-600" v-else>No data</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    DoughnutChart: Doughnut,
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [],
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    };

    const fetchOrderStatusData = async () => {
      try {
          const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.sales_order_data');
          const data = await response.json();
       

          if (data.message && data.message.message && Array.isArray(data.message.message)) {
          const statusCounts = {
              'To Deliver': 0,
              'To Bill': 0,
              'Completed': 0,
          };

          data.message.message.forEach(order => {
              if (order.status in statusCounts) {
              statusCounts[order.status]++;
              }
          });

          chartData.value = {
              labels: Object.keys(statusCounts),
              datasets: [
              {
                  label: 'Order Status',
                  data: Object.values(statusCounts),
                  backgroundColor: [
                  '#525CEB',
                  '#ED5AB3',
                  '#06D001'
                  ],
                  hoverOffset: 6,
              },
              ],
          };
          } 
      } catch (error) {
          console.error('Error fetching order status data:', error);
      }
      };

    onMounted(fetchOrderStatusData);

    return {
      chartData,
      options,
    };
  },
};
</script>

<style scoped>
</style>
