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
            return `${tooltipItem.label}: ${formatSpending(tooltipItem.raw)}`;
            },
        },
        },
    },
    };

    const formatSpending = (value) => {
    if (value >= 10000000) {
        return (value / 10000000).toFixed(1) + ' Crores';
    } else if (value >= 100000) {
        return (value / 100000).toFixed(1) + ' Lakhs';
    }
    return value.toFixed(0);
    };

    const fetchSpendingByCategory = async () => {
    try {
        const response = await fetch('/api/method/go1_customer.go1_customer.api.dashboard.spending_by_product_category');
        const data = await response.json();     
        
        if (data.message && Array.isArray(data.message)) {
        const labels = data.message.map(item => item.category);
        const dataCounts = data.message.map(item => item.total_spending);
        const colors = labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16));
        chartData.value = {
            labels: labels,
            datasets: [
            {
                label: 'Total Spending',
                data: dataCounts,
                // backgroundColor: [
                // '#FF6384',
                // '#36A2EB',
                // '#FFCE56',
                // '#4BC0C0',
                // '#9966FF',
                // '#FF9F40',
                // ], 
                backgroundColor: colors,
                hoverOffset: 6,
            },
            ],
        };
        }
    } catch (error) {
        console.error('Error fetching spending by product:', error);
    }
    };

    onMounted(fetchSpendingByCategory);

    return {
    chartData,
    options,
    };
},
};
</script>

