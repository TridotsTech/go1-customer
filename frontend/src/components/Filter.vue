<template>
    <div class="h-16 px-5 flex items-center gap-3">
        <template v-for="field in standardFilterFields" :key="field.fieldname">
            <div v-if="field.fieldtype === 'Data' || field.fieldtype === 'Currency'">
                <TextInput
                    v-model="filterValues[field.fieldname]"
                    :placeholder="field.label"
                    size="sm"
                    variant="subtle"
                    class="w-48"
                />
            </div>
            <div v-else-if="field.fieldtype === 'Select'">
                <FormControl
                    type="select"
                    :placeholder="`Select ${field.label}`"
                    :options="[{ value: '', label: '' }, ...(Array.isArray(field.options) ? field.options : [])]"
                    v-model="filterValues[field.fieldname]"
                    size="sm"
                    variant="subtle"
                    class="w-48"
                />
            </div>
            <div v-else-if="field.fieldtype === 'Date'">
                <DatePicker
                    type="date"
                    v-model="filterValues[field.fieldname]"
                    :placeholder="field.label"
                    size="sm"
                    variant="subtle"
                    class="w-48"
                />
            </div>
        </template>
        <div class="flex ml-auto">
            <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters">Reset</Button>
        </div>
        <RefreshButton @refresh="reload" :isLoading="isLoading" />
    </div>
</template>

<script setup>
import RefreshButton from '@/components/RefreshButton.vue';
import { TextInput, FormControl, DatePicker, Button } from 'frappe-ui';

const props = defineProps({
    standardFilterFields: Array,
    filterValues: Object,
    isLoading: Boolean,
    resetFilters: Function,
    reload: Function,
});

</script>
