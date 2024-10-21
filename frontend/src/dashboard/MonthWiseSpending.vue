<template>
  <div class="flex justify-center items-center h-52 text-center">
    <LineChart :data="chartData" :options="options" v-if="chartData.labels && chartData.labels.length > 0" />
    <p class="text-[12px] mb-14 text-gray-600" v-else>No data</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  components: {
    LineChart: Line,
  },
  setup() {
    const chartData = ref({
      labels: [], 
      datasets: [],
    });

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Months',
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          type: 'linear',
          title: {
            display: true,
            text: 'Spending Amount',
          },
          ticks: {
            callback: function(value) {
              if (value >= 10000000) { 
                return (value / 10000000).toFixed(1) + ' Crores';
              } else if (value >= 100000) { 
                return (value / 100000).toFixed(1) + ' Lakhs';
              } else {
                return value.toFixed(0);
              }
            },
          },
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const fetchMonthWiseSpending = async () => {
      try {
        const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.month_wise_spending');
        const data = await response.json();        

        if (data.message && Array.isArray(data.message)) {
          const monthMapping = {
            '01': 'Jan', '02': 'Feb', '03': 'Mar',
            '04': 'Apr', '05': 'May', '06': 'Jun',
            '07': 'Jul', '08': 'Aug', '09': 'Sep',
            '10': 'Oct', '11': 'Nov', '12': 'Dec'
          };

          const startYear = parseInt(data.message[0].month.split('-')[0], 10);
          const startMonth = data.message[0].month.split('-')[1];

          const financialYearOrder = [
            '04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03'
          ];

          const labels = financialYearOrder.map((monthKey, index) => {
            const year = monthKey >= '04' ? startYear : startYear + 1;
            return `${monthMapping[monthKey]} ${year}`;
          });

          console.log('Labels:', labels);

          const sortedData = financialYearOrder.map((monthKey) => {
            const matchingItem = data.message.find(item => item.month.slice(-2) === monthKey);
            return matchingItem ? matchingItem.total_spending : 0;
          });

          console.log('Sorted Data:', sortedData);

          chartData.value = {
            labels: labels,
            datasets: [
              {
                label: 'Total Spending',
                data: sortedData,
                backgroundColor: 'rgba(0, 204, 221, 0.5)',
                borderColor: '#4F75FF',
                borderWidth: 2,
                hoverBackgroundColor: '#7CF5FF',
                fill: true, 
              },
            ],
          };
        } 
      } catch (error) {
        
      }
    };

    onMounted(fetchMonthWiseSpending);

    return {
      chartData,
      options,
    };
  },
};
</script>

<style scoped>
.text-center {
  margin: 0 auto;
  width: 100%;
}
</style>
