<template>
    <v-card
        class="mx-auto h-100"
        prepend-icon="mdi-view-dashboard"
        title="Lezenet"
        subtitle="Reporte de operaciones"
        color="primary"
        variant="tonal"
        >
        <v-card-text
        class="pt-4">
            <v-row>
                <v-col cols="12" sm="8" md="2">
                    <v-icon>mdi-information</v-icon>
                </v-col>
                <v-col cols="12" sm="4" md="10" class="text-caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <span class="subheading">Filtros y controles</span>
            <v-chip-group 
                v-model="selectedChip" 
                selected-class="text-primary bg-green-accent-1"
                mandatory
                color="primary"
            >
                <v-chip 
                    v-for="(tag, index) in tags" 
                    :key="tag"
                    :value="index"
                    @click="handleChipSelection(index)"
                    variant="tonal"
                >
                    {{ tag }}
                </v-chip>
            </v-chip-group>

            <!-- Date Selection Section -->
            <div class="mt-4">
                <v-row class="mt-2">
                    <v-col cols="12">
                        <v-text-field
                            v-model="dateDisplayText"
                            :label="dateMode === 'single' ? 'Seleccionar fecha' : 'Seleccionar rango de fechas'"
                            prepend-icon="mdi-calendar"
                            readonly
                            @click="showDatePicker = true"
                            variant="outlined"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
                
                <!-- Date Picker Dialog -->
                <v-dialog v-model="showDatePicker" max-width="400px">
                    <v-card>
                        <v-card-title>
                            {{ dateMode === 'single' ? 'Seleccionar fecha' : 'Seleccionar rango de fechas' }}
                        </v-card-title>
                        <v-card-text>
                            <v-date-picker
                                v-model="selectedDates"
                                :multiple="dateMode === 'range' ? 'range' : false"
                                color="primary"
                                width="100%"
                                @update:model-value="onDateChange"
                            ></v-date-picker>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="clearDates" variant="outlined">Limpiar</v-btn>
                            <v-btn @click="showDatePicker = false" color="primary">Cerrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <!-- Range Slider - only visible for date ranges -->
            <div v-if="dateMode === 'range'" class="mt-4">
                <v-subheader class="text-subtitle-2 mb-2">
                    Ajustar rango de fechas ({{ sliderRange[1] - sliderRange[0] + 1 }} días)
                </v-subheader>
                <v-range-slider
                    v-model="sliderRange"
                    :min="0"
                    :max="maxSliderDays"
                    :step="1"
                    color="primary"
                    show-ticks="always"
                    tick-size="2"
                    @update:model-value="onSliderChange"
                    class="mt-2"
                >
                </v-range-slider>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <span class="subheading">Principales estadísticas</span>
            
            <!-- Statistics Row -->
            <v-row class="mt-3">
                <!-- Número de Unidades -->
                <v-col cols="4" class="pa-1">
                    <v-card 
                        variant="outlined" 
                        class="text-center pa-3"
                        color="primary"
                    >
                        <v-icon 
                            icon="mdi-truck" 
                            size="large" 
                            color="primary"
                            class="mb-2"
                        ></v-icon>
                        <div class="text-h5 font-weight-bold text-primary">
                            24
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            Unidades
                        </div>
                    </v-card>
                </v-col>

                <!-- Número de Viajes -->
                <v-col cols="4" class="pa-1">
                    <v-card 
                        variant="outlined" 
                        class="text-center pa-3"
                        color="success"
                    >
                        <v-icon 
                            icon="mdi-map-marker-path" 
                            size="large" 
                            color="success"
                            class="mb-2"
                        ></v-icon>
                        <div class="text-h5 font-weight-bold text-success">
                            156
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            Viajes
                        </div>
                    </v-card>
                </v-col>

                <!-- Total de Kilómetros -->
                <v-col cols="4" class="pa-1">
                    <v-card 
                        variant="outlined" 
                        class="text-center pa-3"
                        color="warning"
                    >
                        <v-icon 
                            icon="mdi-speedometer" 
                            size="large" 
                            color="warning"
                            class="mb-2"
                        ></v-icon>
                        <div class="text-h5 font-weight-bold text-warning">
                            12.54
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            Kilómetros
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <!--place here button actions for map interaction-->
        </v-card-actions>
    </v-card>

</template>

<script setup>
import { ref, computed } from 'vue'

const tags = ref(['Hoy', '5 Días', '15 Días'])
const selectedChip = ref(0) // Default to "Hoy"
const showDatePicker = ref(false)
const dateMode = ref('single') // 'single' or 'range'
const selectedDates = ref(null)
const sliderRange = ref([0, 4]) // Default for 5 days
const maxSliderDays = ref(14) // Maximum days for slider
const baseDate = ref(new Date()) // Base date for slider calculations

// Initialize with today's date
const initializeToday = () => {
    const today = new Date()
    selectedDates.value = today
}

// Handle chip selection
const handleChipSelection = (index) => {
    selectedChip.value = index
    
    switch (index) {
        case 0: // Hoy - always use current date
            dateMode.value = 'single'
            selectedDates.value = new Date() // Always current date for "Hoy"
            break
        case 1: // 5 Días
        case 2: // 15 Días
            // Use the currently selected date as reference, or today if none selected
            let referenceDate = new Date()
            if (selectedDates.value) {
                if (Array.isArray(selectedDates.value)) {
                    // If it was a range, use the end date (most recent)
                    referenceDate = new Date(selectedDates.value[1] || selectedDates.value[0])
                } else {
                    // If it was a single date, use that date
                    referenceDate = new Date(selectedDates.value)
                }
            }
            
            dateMode.value = 'range'
            const daysBack = index === 1 ? 4 : 14 // 5 days = 4 days back, 15 days = 14 days back
            const startDate = new Date(referenceDate)
            startDate.setDate(referenceDate.getDate() - daysBack)
            selectedDates.value = [startDate, referenceDate]
            
            // Update slider settings
            baseDate.value = new Date(referenceDate)
            maxSliderDays.value = index === 1 ? 4 : 14
            sliderRange.value = [0, maxSliderDays.value]
            break
    }
}

// Convert slider value to date
const getDateFromSliderValue = (sliderValue) => {
    const date = new Date(baseDate.value)
    date.setDate(baseDate.value.getDate() - (maxSliderDays.value - sliderValue))
    return date
}

// Handle slider change
const onSliderChange = (newRange) => {
    if (dateMode.value === 'range') {
        const startDate = getDateFromSliderValue(newRange[0])
        const endDate = getDateFromSliderValue(newRange[1])
        selectedDates.value = [startDate, endDate]
    }
}

// Initialize with today's date on component mount
initializeToday()

// Computed property for display text
const dateDisplayText = computed(() => {
    if (!selectedDates.value) return ''
    
    if (dateMode.value === 'single') {
        return new Date(selectedDates.value).toLocaleDateString('es-ES')
    } else {
        // For range mode
        if (Array.isArray(selectedDates.value) && selectedDates.value.length === 2) {
            const startDate = new Date(selectedDates.value[0]).toLocaleDateString('es-ES')
            const endDate = new Date(selectedDates.value[1]).toLocaleDateString('es-ES')
            return `${startDate} - ${endDate}`
        } else if (selectedDates.value) {
            return new Date(selectedDates.value).toLocaleDateString('es-ES')
        }
    }
    return ''
})

const onDateChange = (newDates) => {
    selectedDates.value = newDates
    
    // Update slider when dates change manually via date picker
    if (dateMode.value === 'range' && Array.isArray(newDates) && newDates.length === 2) {
        const startDate = new Date(newDates[0])
        const endDate = new Date(newDates[1])
        
        // Update base date to the end date
        baseDate.value = new Date(endDate)
        
        // Calculate slider values based on the new dates
        const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        maxSliderDays.value = Math.max(daysDiff, maxSliderDays.value)
        
        // Update slider range
        sliderRange.value = [maxSliderDays.value - daysDiff, maxSliderDays.value]
    }
    
    // Auto-close dialog when selection is complete
    if (dateMode.value === 'single' && newDates) {
        setTimeout(() => {
            showDatePicker.value = false
        }, 300)
    } else if (dateMode.value === 'range' && Array.isArray(newDates) && newDates.length === 2) {
        setTimeout(() => {
            showDatePicker.value = false
        }, 300)
    }
}

const clearDates = () => {
    selectedDates.value = null
    showDatePicker.value = false
}

</script>

<style scoped>

</style>