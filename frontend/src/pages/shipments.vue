<template>
  <div class="h-[calc(100vh)] overflow-hidden flex flex-col">
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-2.5 sm:px-5">Shipments</header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">
        <div class="fiter flex gap-2 flex items-center justify-between  px-1 py-4 -mt-3">
          <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" class="w-48" />
          <FormControl type="select" :options="[
            {},
            { label: 'Draft', value: 'Draft' },
            { label: 'To Bill', value: 'To Bill' },
            { label: 'Return Issued', value: 'Return Issued' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Cancelled', value: 'Cancelled' },
            { label: 'Closed', value: 'Closed' },
          ]" size="sm" variant="subtle" placeholder="Status" v-model="filterStatus" class="w-48" />
          <TextInput type="search" size="sm" variant="subtle" placeholder="Total" v-model="filterTotal" class="w-48" />
          <DatePicker class="border-none w-48" size="md" variant="subtle" placeholder="Date" v-model="filterDate" />
          <div class="flex ml-auto">
            <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters"> Reset</Button>
          </div>
          <RefreshButton @refresh="reload" :isLoading="isLoading" />
        </div>

        <ListView class="h-full" :columns="columns" :rows="paginatedRows" :options="{
          getRowRoute: (row) => ({
            name: 'ShipmentDetails',
            params: { id: row.name },
          }),
          selectable: true,
          showTooltip: true,
          resizeColumn: true,
          emptyState: {
            title: 'No records found',
          },
        }" row-key="name" @row-click="OpenClick">
          <template #cell="{ item, column }">
            <div v-if="column.key === 'status'">
              <Badge v-bind="getStatusTheme(item)" size="sm" :label="item" />
            </div>
            <div v-else-if="column.key === 'name'">
              <span class="text-black text-base" style="
                  max-width: 170px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: block;
                ">
                {{ item }}
              </span>
            </div>
            <div v-else>
              <span class="font-small text-gray-700 text-base" style="
                  max-width: 170px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: block;
                ">{{ item }}</span>
            </div>
          </template>
        </ListView>
        <pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows" />
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import RefreshButton from '@/components/RefreshButton.vue'
import ListView from '@/components/ListView/ListView.vue'
import Pagination from '@/components/Pagination.vue'
import { ref, onMounted, computed } from 'vue'
import {
  createResource,
  TextInput,
  FormControl,
  Badge,
  DatePicker,
  Button,
} from 'frappe-ui'
import { useRouter } from 'vue-router'

export default {
  components: {
    LeftSidebar,
    ListView,
    Pagination,
    TextInput,
    FormControl,
    Badge,
    DatePicker,
    RefreshButton,
    Button,
  },
  setup() {
    const isSidebarCollapsed = ref(false)
    const paginatedRows = ref([])
    const rows = ref([])
    const isLoading = ref(false)
    const columns = ref([
      { label: 'Name', key: 'name' },
      { label: 'Status', key: 'status' },
      { label: 'Item', key: 'item_name' },
      { label: 'Date', key: 'posting_date' },
      { label: 'Total', key: 'grand_total' },
    ])

    const todos = createResource({
      url: 'go1_customer.go1_customer.api.api.get_shipments',
      method: 'get',
    })

    const shipment = async () => {
      try {
        isLoading.value = true
        const data = await todos.fetch()
        rows.value = data.map((row) => ({
          ...row,
          total: String(row.total),
          item_name:
            row.items.map((item) => item.item_name).join(', ') || 'No items',
        }))        
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        isLoading.value = false
      }
    }

    const reload = () => {
      shipment()
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const router = useRouter()

    const OpenClick = (row) => {      
      if (row && row.name) {
        router.push({ name: 'ShipmentDetails', params: { id: row.name } })
      } else {
        console.error('Row data is invalid:', row)
      }
    }

    const updatePaginatedRows = (newPaginatedRows) => {
      paginatedRows.value = newPaginatedRows
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
      return rows.value.filter((row) => {
        const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
        const statusMatch = row.status.toLowerCase() === filterStatus.value.toLowerCase() || !filterStatus.value;
        const grand_totalMatch = row.grand_total.toString().replace(/[.,]/g, '').includes(filterTotal.value.toString().replace(/[.,]/g, '')) ||!filterTotal.value
        const reversedDate = filterDate.value.split('-').reverse().join('-')
        const dateMatch = row.posting_date && row.posting_date.includes(reversedDate)

        return nameMatch && statusMatch && grand_totalMatch && dateMatch
      })
    })

    const getStatusTheme = (status) => {
      switch (status) {
        case 'Draft':
          return { theme: 'red' }
        case 'Completed':
          return { theme: 'blue' }
        case 'Cancelled':
          return { theme: 'green' }
        case 'Closed':
          return { theme: 'orange' }
        default:
          return { theme: 'gray' }
      }
    }

    onMounted(() => {
      shipment()
    })

    return {
      isSidebarCollapsed,
      rows,
      columns,
      toggleSidebar,
      OpenClick,
      updatePaginatedRows,
      paginatedRows,
      filterName,
      filterStatus,
      filterTotal,
      filteredRows,
      filterDate,
      resetFilters,
      getStatusTheme,
      isLoading,
      reload,
    }
  },
}
</script>



<style scoped>
.head-layout {
  display: flex;
  width: 100%;
  transition: margin-left 0.3s ease;
}

.layout {
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  transition: margin-left 0.3s ease;
}

.main-content {
  flex-grow: 1;
  padding: 1.25rem;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
}

.head-content {
  flex-grow: 1;
  padding: 0px;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
 
}

.collapsed .main-content {
  margin-left: 60px;
 
}

.collapsed .head-content {
  margin-left: 60px;

}

.pagination {
  margin-top: auto;
}

.row:hover {
  background-color: #f9fafb;
 
}
</style>