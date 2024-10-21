<template>
    <div v-if="rows.length > 0" class="h-12 border-t px-5 flex justify-between items-center">
        <div class="flex rounded bg-gray-100 p-0.5">
            <Button
                v-for="num in [20, 50, 100]"
                :key="num"
                :variant="'subtle'"
                theme="gray"
                size="sm"
                :label="String(num)"
                @click="setItemsPerPage(num)"
                :disabled="itemsPerPage === num"
                :style="{ color: currentButton  === num ? 'black' : '' }"
                :class="['w-13', { 'bg-white border border-gray-400': currentButton  === num }]"
            />
        </div>
        <div class="right flex items-center">
            <Button :variant="'subtle'" theme="gray" size="sm" @click="loadMoreItems">Load More</Button>
            <span class="text-sm text-gray-600 ml-5">{{ paginatedRows.length }} of {{ rows.length }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Button } from 'frappe-ui'


const props = defineProps({
    rows: {
        type: Array,
        required: true,
    },
})


const emit = defineEmits(['update:paginatedRows'])

const itemsPerPage = ref(10)
const currentPage = ref(1)
const currentButton = ref(null);

const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return props.rows.slice(start, end)
})

watch(paginatedRows, (newPaginatedRows) => {
    emit('update:paginatedRows', newPaginatedRows)
})

const setItemsPerPage = (num) => {
    itemsPerPage.value = num
    currentButton.value = num;
    currentPage.value = 1
}

const loadMoreItems = () => {
    itemsPerPage.value += 20
    currentPage.value = 1
}
</script>
