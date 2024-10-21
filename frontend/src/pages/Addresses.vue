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
                    <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName"class="w-48" />         
                    <FormControl type="select"
                    :options="[
                        {},
                        { label: 'Billing',value: 'Billing',}, { label: 'Shipping',value: 'Shipping',}, { label: 'Office',value: 'Office',},
                        { label: 'Postal',value: 'Postal',},   { label: 'Plant',value: 'Plant',},   { label: 'Personal',value: 'Personal',},
                        { label: 'Shop',value: 'Shop',},   { label: 'Subsidiary',value: 'Subsidiary',},{ label: 'Warehouse',value: 'Warehouse',}, 
                        { label: 'Other',value: 'Other',}, { label: 'Permanent',value: 'Permanent',}, { label: 'Current',value: 'Current',},     
                            
                        ]"
                        size="sm" variant="subtle" placeholder="address" v-model="filterAddress" class="w-48" />
                    <TextInput type="search" size="sm" variant="subtle" placeholder="city" v-model="filterCity" class="w-48" />
                    <TextInput type="search" size="sm" variant="subtle" placeholder="post code" v-model="filterPost" class="w-48" />
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
                   <div v-if="column.key === 'address_type'">
                      <Badge v-bind="getaddress_typeTheme(item)" size="sm" :label="item" />
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
    url: 'go1_customer.go1_customer.api.api.get_address',
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
       console.error("Failed to Addresses data", error)
    } finally {
       isLoading.value = false
    }
  }
  
  const updatePaginatedRows = (newPaginatedRows) => {
    paginatedRows.value = newPaginatedRows
  }
  
 const router = useRouter()
 const RowClick = (row) => {   
    router.push({ name: 'AddressDetails', params: { id: row.name } });
 }
 
 
 const resetFilters = () => {
      filterName.value = ''
      filterAddress.value = ''
      filterCity.value = ''
      filterPost.value = ''
    }

    const filterName = ref('')
    const filterAddress = ref('')
    const filterCity = ref('')
    const filterPost = ref('')

    const filteredRows = computed(() => {
      return rows.value.filter(row => {
        const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())       
        const addressMatch = row.address_type.toLowerCase()===filterAddress.value.toLowerCase() || !filterAddress.value; 
        const cityMatch = row.city.toString().includes(filterCity.value.toString()) || !filterCity.value;
        const postMatch = row.pincode.toString().includes(filterPost.value.toString()) || !filterPost.value;
        return nameMatch && addressMatch && cityMatch && postMatch;
      });
    });
  
  const reload = () => {
    fetchData()
  }
  
  const getaddress_typeTheme = (address_type) => {
         switch (address_type) {
        case 'Shipping':
          return { theme: 'red' }
        case 'Billing':
          return { theme: 'blue' }
        case 'Plant':
          return { theme: 'green' }
        case 'Warehouse':
          return { theme: 'orange' }
        default:
          return { theme: 'gray' }
      }
    }

   
  onMounted(() => {
    fetchData()
  })
  </script>
  