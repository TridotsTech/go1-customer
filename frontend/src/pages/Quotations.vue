<template>
   <div class="flex h-screen w-screen">
      <div class="left h-full border-r bg-gray-50">
         <AppSidebar />
      </div>
      <div class="right flex-1 flex flex-col h-full overflow-auto">
         <div class="h-full w-full flex flex-col">
            <!-- Header -->
            <AppHeader />
            <!-- filter -->
            <div class="h-16 px-5 flex items-center gap-3 ">
               <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" class="w-48" />
                  <FormControl type="select" :options="[
                     {},
                     { label: 'Draft', value: 'Draft', }, { label: 'Open', value: 'Open', }, { label: 'Replied', value: 'Replied', },
                     { label: 'Partially Ordered', value: 'Partially Ordered', }, { label: 'Ordered', value: 'Ordered', }, { label: 'Lost', value: 'Lost', },
                     { label: 'Cancelled', value: 'Cancelled', }, { label: 'Expired', value: 'Expired', },
                  ]" size="sm" variant="subtle" placeholder="Status" v-model="filterStatus" class="w-48" />
                  <TextInput type="search" size="sm" variant="subtle" placeholder="Total" v-model="filterTotal" class="w-48" />
                  <DatePicker class="border-none w-48" size="md" variant="subtle" placeholder="Date" v-model="filterDate" />
                  <div class="flex ml-auto">
                     <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters"> Reset</Button>
                  </div>
               <RefreshButton @refresh="reload" :isLoading="isLoading" />
            </div>
            <!-- List View -->
 
            <ListView class="listview overflow-auto px-5 flex-1" :columns="columns" :rows="paginatedRows" :options="{
               selectable: true,
               showTooltip: true,
               resizeColumn: true,
               onRowClick: RowClick,
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
 import { ref, onMounted, computed } from 'vue'
 import AppSidebar from '@/components/Layouts/AppSidebar.vue'
 import AppHeader from '@/components/Layouts/AppHeader.vue'
 import Pagination from '@/components/Pagination.vue'
 import RefreshButton from '@/components/RefreshButton.vue'
 import { ListView, createResource, Badge, TextInput, FormControl, DatePicker, Button } from 'frappe-ui'
 import { useRouter } from 'vue-router'
 
 
 const quote = createResource({
   url: 'go1_customer.go1_customer.api.api.get_quotation',
   method: 'get',
 })
 
 const columns = ref([])
 const rows = ref([])
 const paginatedRows = ref([])
 const isLoading = ref(false)
 
 const fetchData = async () => {
   try {
      isLoading.value = true
      const response = await quote.fetch()
      const enabledFields = response.meta.fields.filter(field => field.in_list_view)
      columns.value = [
         { label: 'Name', key: 'name' },
         ...enabledFields.map(field => ({
            label: field.label,
            key: field.fieldname,
         }))
      ]
      rows.value = response.data
   } catch (error) {
      console.error("Failed to fetch quotation data", error)
   } finally {
      isLoading.value = false
   }
 }
 
 const updatePaginatedRows = (newPaginatedRows) => {
   paginatedRows.value = newPaginatedRows
 }
 
const router = useRouter()
const RowClick = (row) => {   
   router.push({ name: 'QuotationDetails', params: { id: row.name } });
}

 const resetFilters = () => {
      filterName.value = ''
      filterStatus.value = ''
      filterTotal.value = ''
      filterDate.value = ''
 }
 
 const filterName = ref('')
 const filterStatus = ref('')
 const filterTotal = ref('')
 const filterDate = ref('')
 
 const filteredRows = computed(() => {
   return rows.value.filter(row => {
      const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
      const statusMatch = row.status.toLowerCase() === filterStatus.value.toLowerCase() || !filterStatus.value
      const grand_totalMatch = row.grand_total.toString().replace(/[.,]/g, '').includes(filterTotal.value.toString().replace(/[.,]/g, '')) || !filterTotal.value
      const reversedDate = filterDate.value.split('-').reverse().join('-')
      const dateMatch = row.transaction_date && row.transaction_date.includes(reversedDate)
 
      return nameMatch && statusMatch && grand_totalMatch && dateMatch
   })
 })
 
 const reload = () => {
   fetchData()
 }
 
 const getStatusTheme = (status) => {
   switch (status) {
      case 'Draft':
         return { theme: "red" }
      case 'Open':
         return { theme: "blue" }
      case 'Cancelled':
         return { theme: "Green" }
      case 'Ordered':
         return { theme: "orange" }
      default:
         return { theme: "gray" }
   }
 }
  
 onMounted(() => {
   fetchData()
 })
 </script>
 