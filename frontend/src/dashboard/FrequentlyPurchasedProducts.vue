<template>
  <div class="flex justify-center items-center h-52 text-center">
    <BarChart :data="chartData" :options="options" v-if="chartData.labels && chartData.labels.length > 0" />
    <p class="text-[12px] mb-14 text-gray-600" v-else>No data</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar,
  },
  setup() {
    const chartData = ref({
      labels: [], 
      datasets: [],
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Products',
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 0,
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
            text: 'Quantity',
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
      animation: {
          duration: 1000,
          easing: 'easeInOutBounce',
        },
    };

    const calculateAverages = (counts) => {
      const minCount = Math.min(...counts);
      const maxCount = Math.max(...counts);
      const midAverage = (minCount + maxCount) / 2;

      return {
        min: minCount,
        max: maxCount,
        mid: midAverage,
      };
    };

    const fetchFrequentlyPurchasedProducts = async () => {
      try {
        const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.frequently_purchased_products');
        const data = await response.json();
        

        if (data.message && Array.isArray(data.message)) {
          const labels = data.message.map(item => item.item_name || 'Unknown Product'); 
          const dataCounts = data.message.map(item => item.purchase_count || 0); 

          const { min, max, mid } = calculateAverages(dataCounts);

          const colors = dataCounts.map((count) => {
            if (count <= min) {
              return '#FF7ED4'; 
            } else if (count >= max) {
              return '#15F5BA'; 
            } else if (count >= mid) {
              return '#836FFF'; 
            } else {
              return '#FFD700'; 
            }
          });

          chartData.value = {
            labels: labels,
            datasets: [
              {
                label: 'Purchase Count',
                data: dataCounts,
                backgroundColor: colors, 
                borderColor: 'rgba(0, 0, 0, 1)', 
                borderWidth: 0,
              },
            ],
          };
        } else {
          console.error('Expected message to be an array but received:', data.message);
        }
      } catch (error) {
        console.error('Error fetching frequently purchased products:', error);
      }
    };

    onMounted(fetchFrequentlyPurchasedProducts);

    return {
      chartData,
      options,
    };
  },
};
</script>
