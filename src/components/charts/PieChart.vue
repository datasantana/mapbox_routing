<template>
    <Pie 
        :data="chartData" 
        :options="options" 
        :height="height"
    />
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

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