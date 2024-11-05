<template>
    <div class="flex h-screen w-screen">
        <div class="left h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="right flex-1 flex flex-col h-full overflow-auto">
            <div class="h-full w-full flex flex-col">
                <!-- Header -->
                <AppHeader />
 
                <!-- Dynamic Filters -->
                <FilterBar :standardFilterFields="standardFilterFields" :filterValues="filterValues"
                    :isLoading="isLoading" :resetFilters="resetFilters" :reload="reload" />
 
                <!-- Loading Spinner -->
                <div v-if="isLoading" class="flex justify-center items-center flex-1">
                    <Spinner class="w-8" />
                </div>
 
                <!-- List View -->
                <ListView v-else class="listview overflow-auto px-5 flex-1" :columns="columns" :rows="paginatedRows"
                    :options="{
                        getRowRoute: (row) => ({ name: 'InvoiceDetails',params: { id: row.name }, }),
                        selectable: true,
                        showTooltip: true,
                        resizeColumn: true,
                        emptyState: {
                            title: 'No records found',
                        },
                    }" row-key="name">
                    <template #cell="{ item, column }">
                        <div v-if="column.key === 'status'">
                            <Badge v-bind="getStatusTheme(item)" size="sm" :label="item" />
                        </div>
                        <div v-else-if="column.key === 'name'">
                            <span class="text-black text-base"
                                style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                                {{ item }}
                            </span>
                        </div>
                        <div v-else-if="column.fieldtype  === 'Date'"> 
                             <span class="font-small text-gray-700 text-base"
                                 style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                                 {{ dayjs(item).format('DD-MM-YYYY') }} 
                             </span>
                         </div>
                        <div v-else>
                            <span class="font-small text-gray-700 text-base"
                                style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                                {{ item }}
                            </span>
                        </div>
                    </template>
                </ListView>
 
                <!-- Pagination -->
                <Pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows" />
            </div>
        </div>
    </div>
 </template>
 
 <script setup>
 import { ref, onMounted, computed } from 'vue';
 import dayjs from 'dayjs'; 
 import AppSidebar from '@/components/Layouts/AppSidebar.vue';
 import AppHeader from '@/components/Layouts/AppHeader.vue';
 import Pagination from '@/components/Pagination.vue';
 import FilterBar from '@/components/Filter.vue';
 import { ListView, createResource, Badge, Spinner } from 'frappe-ui';
 
 const quote = createResource({
    url: 'go1_customer.go1_customer.api.api.get_salesinvoice',
    method: 'get',
 });
 
 const columns = ref([]);
 const rows = ref([]);
 const paginatedRows = ref([]);
 const isLoading = ref(false);
 const standardFilterFields = ref([]);
 const filterValues = ref({});
 
 const fetchData = async () => {
    try {
        isLoading.value = true;
        const response = await quote.fetch();
 
        standardFilterFields.value = response.meta.fields.filter(field => field.in_standard_filter);
 
        standardFilterFields.value.forEach(field => {
            if (field.fieldtype === 'Select' && typeof field.options === 'string') {
                field.options = field.options.split('\n');
            }
            filterValues.value[field.fieldname] = '';
        });
 
        const enabledFields = response.meta.fields.filter(field => field.in_list_view);
        columns.value = [
            { label: 'Name', key: 'name' },
            ...enabledFields.map(field => ({
                label: field.label,
                key: field.fieldname,
                fieldtype: field.fieldtype,
            })),
        ];
        rows.value = response.data;
    } catch (error) {
        console.error("Failed to fetch data", error);
    } finally {
        isLoading.value = false;
    }
 };
 
 const updatePaginatedRows = (newPaginatedRows) => {
    paginatedRows.value = newPaginatedRows;
 };
 
 const resetFilters = () => {
    Object.keys(filterValues.value).forEach(key => {
        filterValues.value[key] = '';
    });
 };
 
 const filteredRows = computed(() => {
    return rows.value.filter(row => {
        return Object.keys(filterValues.value).every(key => {
            const filterValue = filterValues.value[key];
            if (filterValue) {
                return row[key].toString().toLowerCase().includes(filterValue.toString().toLowerCase());
            }
            return true;
        });
    });
 });
 
 const reload = () => {
    fetchData();
 };
 
 const getStatusTheme = (status) => {
       switch (status) {
         case 'Draft':
           return { theme: 'red' };
         case 'Overdue':
           return { theme: 'blue' };
         case 'Cancelled':
           return { theme: 'green' };
         case 'Return':
           return { theme: 'orange' };
         default:
           return { theme: 'gray' };
       }
     };
 
 onMounted(() => {
    fetchData();
 });
 </script>
 