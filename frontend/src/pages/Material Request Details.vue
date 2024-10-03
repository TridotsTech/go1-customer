<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header
          class="bdelivery-b bg-white px-5 py-6.5 pb-[2.625rem] sm:px-5 mb-12"
        >
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
          <Button
            :variant="'solid'"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            class="float-right"
          >
            + Quotations
          </Button>
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content p-5">
        <div class="bdelivery-b pb-1 -mt-10">
          <h1 class="text-2xl font-bold text-gray-800 float-left">
            {{ name }}
          </h1>
          <div class="ml-10">
          <Badge :variant="'subtle'" theme="gray" size="md" label="Badge" class="ml-5">
            <div class="flex items-center ">
              <div
                :style="{
                  backgroundColor: statusColor,
                  bdeliveryColor: bdeliveryColor,
                  bdeliveryWidth: bdeliveryWidth,
                  bdeliveryStyle: 'solid',
                }"
                class="status-dot w-1 h-4 rounded-full"
              </div>
              <span :class="statusColorText" class="ml-2 text-md ">{{
                inputValue
              }}</span>
            
            </div>
          </Badge>
        </div>         
          <div class="flex justify-end space-x-4 pt-4"></div>
        </div>
        <div class="">
          <div
            class="flex items-center gap-2 leading-5 first:mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"
          >
            <div class="shadow rounded-md p-5 min-h-72">
              <div
                class="text-gray-700 mb-5 ml-2 flex h-7 max-w-fit cursor-pointer items-center gap-2 pl-2 pr-3 text-base font-semibold leading-5"
              >
                Details:
              </div>
              <div
                class="flex items-center gap-2 px-3 leading-5 first:mt-1 bdelivery-b pb-1"
              >
                <div class="sm: w-36 shrink-0 text-sm text-gray-600 text-left">
                  Purpose
                </div>
                <div
                  class="grid min-h-[18px] flex-1 items-center text-base text-center"
                >
                {{ purpose }}
                </div>
              </div>
              <div
                class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 bdelivery-b pb-1"
              >
                <div class="sm: w-36 shrink-0 text-sm text-gray-600 text-left">
               Transaction Date:
                </div>
                <div
                  class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center"
                >
                 {{ transactionDate }}
                </div>
              </div>
              <div
                class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 bdelivery-b pb-1"
              >
                <div class="sm: w-36 shrink-0 text-sm text-gray-600 text-left">
                  Required By
                </div>
                <div
                  class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center"
                >
                  {{ requiredDate }}
                </div>
              </div>
              <div
                class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 bdelivery-b pb-1"
              >
                <div class="sm: w-36 shrink-0 text-sm text-gray-600 text-left">
                 
                </div>
                <div
                  class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center"
                >
                
                </div>
              </div>
            </div>
          </div>
        </div>
      

        <div class="bg-white shadow-md rounded-lg p-5 my-6">
          <div
            class="text-gray-700 mb-1 ml-2 flex h-7 max-w-fit cursor-pointer items-center gap-2 pl-2 pr-3 text-base font-semibold leading-5"
          >
            Items:
          </div>
          <div class="bdelivery-b pb-4">
           
          </div>
          

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Warehouse
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  S
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rate(INR)
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount(INR)
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, index) in itemValue" :key="index">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ row.item_name }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  {{ row.qty }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                >
                  {{ row.rate }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right"
                >
                  {{ row.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import { ref, watch, onMounted, computed } from 'vue'
import { createResource, Breadcrumbs, Button, Badge } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    Badge,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isSidebarCollapsed = ref(false)
    const name = ref('')
    const addressLine1 = ref([])
    const addressLine2 = ref([])
    const inputValue = ref('')
    const purpose = ref([])
    const itemValue = ref([])
    const actual = ref([])
    const totalValue = ref([])
    const grandValue = ref([])
    const totalactual = ref([])
    const transactionDate = ref([])
    const customerName = ref([])
    const city = ref([])
    const country = ref([])
    const phone = ref([])
    const state = ref([])
    const warehouse = ref([])
    const stock = ref([])
    const requiredDate = ref([])
    const quotationTo = ref([])
    const material = createResource({
      url: 'go1_customer.go1_customer.api.api.get_material_request',
      method: 'get',
    })

    const breadcrumbsList = ref([
      { label: 'Material Request', route: { name: 'material_request' } },
      { label: '', route: {} },
    ])

    const fetchmat_req = async () => {
      try {
        const id = route.params.id
        const data = await material.fetch()
        console.log('data', data)
        const mat_req = data.find((item) => item.name === id)

        if (mat_req) {
          name.value = mat_req.title
          inputValue.value = mat_req.status
          itemValue.value = mat_req.items || []
          purpose.value = mat_req.material_request_type
          actual.value = mat_req.actual_qty || []
          grandValue.value = mat_req.rounded_total
          warehouse.value = mat_req.warehouse
          stock.value = mat_req.stock_qty
          totalValue.value = mat_req.total
          quotationTo.value = mat_req.quotation_to
          transactionDate.value = mat_req.transaction_date
          requiredDate.value = mat_req.schedule_date
        }
      } catch (error) {
        console.error('Error fetching delivery details:', error)
      }
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    watch(name, (newName) => {
      breadcrumbsList.value[1].label = newName
    })

    onMounted(() => {
      fetchmat_req()
    })

    const statusColor = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'red'
        case 'deliveryed':
          return 'green'
        case 'partially deliveryed':
          return 'yellow'
        case 'lost':
          return 'red'
        case 'cancelled':
          return 'red'
        case 'expired':
          return 'gray'
        default:
          return 'gray'
      }
    })

    const statusColorText = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'text-red-700'
        case 'deliveryed':
          return 'text-green-700'
        case 'partially deliveryed':
          return 'text-yellow-700'
        case 'lost':
          return 'text-red-700'
        case 'cancelled':
          return 'text-red-700'
        case 'expired':
          return 'text-gray-700'
        default:
          return 'text-gray-700'
      }
    })

    const statusBorColor = computed(() => {
      switch (inputValue.value.toLowerCase()) {
        case 'draft':
          return 'bdelivery-red-400'
        case 'deliveryed':
          return 'bdelivery-green-400'
        case 'partially deliveryed':
          return 'bdelivery-yellow-400'
        case 'lost':
          return 'bdelivery-red-400'
        case 'cancelled':
          return 'bdelivery-red-600'
        case 'expired':
          return 'bdelivery-gray-600'
        default:
          return 'bdelivery-gray-300'
      }
    })  
    const bdeliveryWidth = computed(() => 'auto')

    return {
      isSidebarCollapsed,
      name,
      stock,
      inputValue,
      addressLine1,
      itemValue,
      actual,
      customerName,
      totalValue,
      transactionDate,
      quotationTo,
      totalactual,
      grandValue,
      toggleSidebar,
      purpose,
      breadcrumbsList,
      requiredDate,
      statusColor,
      statusColorText,
      statusBorColor,
      bdeliveryWidth,
      addressLine2,
      city,
      country,
      phone,
      state,
      warehouse,
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
  height: 100vh;
  transition: margin-left 0.3s ease;
}

.main-content {
  flex-grow: 1;
  padding: 1.25rem;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
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
.status-dot {
  width: 10px;
  height: 10px; 
}
</style>
