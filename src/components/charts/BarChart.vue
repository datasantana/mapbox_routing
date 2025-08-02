<template>
    <Bar 
        :data="chartData" 
        :options="options" 
        :height="height"
    />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

defineProps({
    chartData: {
        type: Object,
        required: true
    },
    options: {
        type: Object,
        default: () => ({
            responsive: true,
            maintainAspectRatio: false
        })
    },
    height: {
        type: Number,
        default: 300
    }
})
</script>