<template>
  <div class="h-[calc(100vh)] overflow-hidden flex flex-col">
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-5.5 sm:px-5">
          <div class="float-left -mt-3">Issue</div>
          <div class="float-right -mt-3">
            <Button
              :variant="'solid'"
              theme="gray"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
              @click="openCreate"
            >
              + Create
            </Button>
          </div>
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">

        <div class="fiter mb-2 flex gap-3">
          <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" class="w-48" />         
          <FormControl type="select"
            :options="[
              {},
              { label: 'Open',value: 'Open',}, { label: 'On Hold',value: 'On Hold',}, { label: 'Replied',value: 'Replied',},
              { label: 'Resolved',value: 'Resolved',},   { label: 'Closed',value: 'Closed',},             
                             
            ]"
            size="sm" variant="subtle" placeholder="Status" v-model="filterStatus" class="w-48" /> 
            <div class="flex ml-auto">
            <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters"> Reset</Button>  
            <div class="flex gap-2 ml-2">
            <RefreshButton @refresh="reload" :isLoading="isLoading" />
          </div> 
        </div>     
        </div>
        <ListView
        class="h-full"
          :columns="columns"
          :rows="paginatedRows"
          :options="{
            getRowRoute: (row) => ({
              name: 'IssueDetails',
              params: { id: row.name },
            }),
            selectable: true,
            showTooltip: true,
            resizeColumn: true,
            emptyState: {
              title: 'No records found',
            },
          }"
          row-key="name"
          @row-click="OpenClick"
        >
        <template #cell="{ item, column }">
            <div v-if="column.key === 'status'">
              <Badge
                v-bind="getStatusTheme(item)"
                size="sm"
                :label="item"
              />
            </div>
            <div v-else-if="column.key === 'name'">
              <span class="text-black text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                {{ item }}
              </span>
            </div>
            <div v-else>
              <span class="font-small text-gray-700 text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">{{ item }}</span>
            </div>
          </template>
        </ListView>
        <Pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows" />
      </div>
    </div>
  </div>
</template>
  
  <script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import ListView from '@/components/ListView/ListView.vue'
import RefreshButton from '@/components/RefreshButton.vue'
import { ref, onMounted,computed } from 'vue'
import { createResource, TextInput,FormControl,Badge,Button } from 'frappe-ui'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    LeftSidebar,
    ListView,
    Pagination,
    TextInput,
    FormControl,
    Badge,
    RefreshButton,Button
  },
  setup() {
    const isSidebarCollapsed = ref(false)
    const rows = ref([])
    const isLoading = ref(false)
    const paginatedRows = ref([])
    const columns = ref([
      { label: 'Name', key: 'name',  },
      { label: 'Status', key: 'status',  },
      { label: 'Subject', key: 'subject',  },      
      { label: 'Raised By(email)', key: 'owner',  },
      { label: 'Priority', key: 'priority',  },
    ])

    const issues = createResource({
      url: 'go1_customer.go1_customer.api.api.get_issues',
      method: 'get',
    })
    
    const fetchissues = async () => {
      isLoading.value = true
      try {
        const data = await issues.fetch()
        rows.value = data.map((row) => ({
          ...row,
        }))
       
      } catch (error) {
        console.error('Error fetching data:', error)
      }finally {
        isLoading.value = false
      }
    }
    const reload = () => {
      fetchissues() 
    }
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const router = useRouter()

    const openCreate = () => {
      router.push({ name: 'issueNew' })
    }

    const OpenClick = (row) => {
      
      if (row && row.name) {
        router.push({ name: 'IssueDetails', params: { id: row.name } })
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
    }


    const filterName = ref('')
    const filterStatus = ref('')   

    const filteredRows = computed(() => {
      return rows.value.filter(row => {
        const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
        const statusMatch = row.status.toLowerCase() === filterStatus.value.toLowerCase() || !filterStatus.value;
        return nameMatch && statusMatch;
      });
    });

    
    const getStatusTheme = (status) => {         
      switch (status) {
        case 'Open':
          return { theme: "red" };  
        case 'Replied':
          return { theme: "blue" };
        case 'Closed':
          return { theme: "green" };  
        case 'On Hold':
          return { theme: "orange" };            
        default:
          return { theme: "gray" };
      }
    }

    onMounted(() => {
      fetchissues()
    })

    return {
      isSidebarCollapsed,
      rows,
      columns,
      toggleSidebar,
      OpenClick,
      updatePaginatedRows,
      paginatedRows,
      openCreate,
      filterName,
      filterStatus,    
      filteredRows,
      resetFilters,
      getStatusTheme,
      reload,
      isLoading
    
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
.list-row {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb; 
}

.row:hover {
  background-color: #f9fafb; 
}

.pagination {
  margin-top: auto; 
}
</style>
  