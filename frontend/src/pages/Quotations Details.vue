<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white h-12 py-2.5 pb-[2.625rem] sm:px-5 mb-12">
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content  p-5" style="padding-left: 150px; padding-right: 150px;">

<div class="hai border rounded">
  <div class=" px-5  flex border-b h-12 items-center justify-between">

    <h1 class="text-2xl font-bold text-blue-600">
      {{ customerName }}
    </h1>

  
    <div class="badge">
      <Badge :variant="'subtle'" :theme="getTheme(inputValue)" size="sm" label="Badge">
        {{ inputValue }}
      </Badge>
    </div>
  </div>

  <div class="main flex flex-row gap-6 pt-5">
    
    <div class="w-1/2 p-2 min-h-70">
      <div
        class="text-gray-700 mb-5 ml-1 flex h-7 max-w-fit cursor-pointer items-center gap-2 pl-2 pr-3 text-base font-semibold leading-5">
        Details
      </div>
      <div class="flex items-center  px-3 leading-5 first:mt-1 pb-1">
        <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">
          Customer Name:
        </div>
        <div class="grid min-h-[18px] flex-1 items-center text-base text-center">
          {{ customerName }}
        </div>
      </div>
      
      <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 pb-1">
        <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">
          Date:
        </div>
        <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center">
          {{ datesValues }}
        </div>
      </div>
      <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 pb-1">
        <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">
          Valid Date:
        </div>
        <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center">
          {{ duedateValue }}
        </div>
      </div>
    </div>

   
    <div class="w-1/2 p-2 min-h-70">
      <div class="text-gray-700 mb-5 ml-1 flex h-7 max-w-fit cursor-pointer items-center gap-4 pl-2 pr-3 text-base font-semibold leading-5">
        Address & Contact
      </div>
      
      <div class="flex flex-col gap-2">
    
        <div class="flex items-start gap-2 px-3 leading-5 first:mt-1 pb-1">
          <div class="sm:w-20 shrink-0 text-sm text-gray-600 text-left">
            Address:
          </div>
          <div class="grid min-h-[18px] flex-1 items-center text-base text-left">
            <div class="text-sm text-gray-900">
                      <span v-if="addressLine1"> {{ addressLine1 }}</span>
                      <span v-if="addressLine2">{{ addressLine2 }}</span>
                      <span v-if="city">{{ city }},</span>
                      <span v-if="state">{{ state }},</span>
                      <span v-if="country">{{ country }}</span>
                      <span v-if="pincode">- {{ pincode }}</span> 
                    </div>        
          </div>
        </div>             
        
     
        <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 pb-1">
          <div class="sm:w-20 shrink-0 text-sm text-gray-600 text-left">
            Contact:
          </div>
          <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-left">
            <div class="text-sm text-gray-900">
              {{ phone }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




  <div class="bg-white  mt-6">
    <div
      class="text-gray-700 mb-2 ml-5 flex h-7 max-w-fit cursor-pointer items-center gap-2 pr-3 text-base font-semibold leading-5">
      Items
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6"></div>
    <table class="min-w-full border-b">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Item
          </th>
          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantity
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rate(INR)
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount(INR)
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(row, index) in itemValue" :key="index">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ row.item_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            {{ row.qty }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
            {{ row.rate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
            {{ row.amount }}
          </td>
        </tr>
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colspan="3">
            Item Total
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
            {{ totalValue }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>



  <div class="main flex flex-row">
    <div class="w-3/5 flex flex-col pr-4" style="max-height: 400px; overflow-y: auto;"></div>


    
    <div class="w-2/5 flex flex-col">              
      <table class="min-w-full border-l border-gray-200">                
        <tbody class="bg-white">
         
          <tr>
            <td class="px-6 py-4 text-sm font-medium text-left border-b border-gray-200">Total Taxes and Charges
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right border-b border-gray-200">{{ totalTaxValue }}
            </td>
          </tr>
          
          <tr>
            <td class="px-6 py-4 text-sm font-medium text-left border-b border-gray-200">Grand Total</td>
            <td class="px-6 py-4 text-sm font-medium text-right border-b border-gray-200">{{ grandValue }}</td>
          </tr>
          
          <tr>
            <td class="px-6 py-4 text-sm font-medium text-left border-b border-gray-200">In Words</td>
            <td class="px-6 py-4 text-sm font-medium text-right border-b border-gray-200">{{ inWord }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="items">
    <div class=" flex flex-col" style="max-height: 400px; overflow-y: auto;">
      <div
        class="text-gray-700  p-5 flex h-7 max-w-fit cursor-pointer items-center gap-2 pr-3 text-base font-semibold leading-5">
        Taxes
      </div>
      <table class="min-w-full border-t border-gray-200">
        <thead>
          <tr>
            <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">
              Type</th>
            <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">
              Account Head</th>
            <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">Tax
              Rate</th>
            <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">
              Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tax, index) in taxValue" :key="index">
            <td class="px-4 py-2 text-sm text-gray-900" :class="{ 'border-b border-gray-200': index < taxValue.length - 1 }">{{ tax.charge_type }}</td>
            <td class="px-4 py-2 text-sm text-gray-500" :class="{ 'border-b border-gray-200': index < taxValue.length - 1 }">{{ tax.account_head }}</td>
            <td class="px-4 py-2 text-sm text-gray-500" :class="{ 'border-b border-gray-200': index < taxValue.length - 1 }">{{ tax.rate }}%</td>
            <td class="px-4 py-2 text-sm font-medium text-gray-900" :class="{ 'border-b border-gray-200': index < taxValue.length - 1 }">{{ tax.tax_amount }}</td>
          </tr>
        </tbody>  
      </table>
    </div>
  </div>
</div>
<div class="mt-8">&nbsp;</div>
</div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import { ref, watch, onMounted, computed } from 'vue'
import { createResource, Breadcrumbs, FeatherIcon, Badge } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    Breadcrumbs,
    LeftSidebar,
    FeatherIcon,
    Badge,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isItemBoxVisible1 = ref(true)
    const isItemBoxVisible2 = ref(true)
    const isItemBoxVisible3 = ref(true)
    const isSidebarCollapsed = ref(false)
    const customerName = ref('')
    const customer_address = ref('')
    const itemValue = ref('')
    const name = ref('')
    const inputValue = ref('')
    const users = ref('')
    const taxValue = ref('')
    const grandValue = ref('')
    const addressLine1 = ref('')
    const ship_addressLine1 = ref('')
    const ship_addressLine2 = ref('')
    const addressLine2 = ref('')
    const shipping_address_name = ref('')
    const city = ref('')
    const ship_city = ref('')
    const country = ref('')
    const ship_country = ref('')
    const QuotationDetails = ref('')
    const phone = ref('')
    const ship_phone = ref('')
    const state = ref('')
    const ship_state = ref('')
    const ship_pincode = ref('')
    const datesValues = ref('')
    const pincode = ref('')
    const inWord = ref('')
    const totalTaxValue = ref('')
    const duedateValue = ref('')
    const order_type = ref('')
    const quotationTo = ref('')

    const quote = createResource({
      url: 'go1_customer.go1_customer.api.api.get_quotation',
      method: 'get',
    })

    const breadcrumbsList = ref([
      { label: 'Quotation', route: { name: 'quotations' } },
      { label: '', route: {} },
    ])

    const fetchQuoteDetails = async () => {
      try {
        const id = route.params.id
        const data = await quote.fetch()
        const QuotationDetails = data.find((item) => item.name === id)

        if (QuotationDetails) {
          name.value = QuotationDetails.name
          totalTaxValue.value=QuotationDetails.total_taxes_and_charges
          inputValue.value = QuotationDetails.status
          customerName.value = QuotationDetails.customer_name
          datesValues.value = QuotationDetails.transaction_date
          itemValue.value = QuotationDetails.items || []
          taxValue.value = QuotationDetails.taxes || []
          grandValue.value = QuotationDetails.rounded_total
          addressLine1.value = QuotationDetails.address_line1
          addressLine2.value = QuotationDetails.address_line2
          customerName.value = QuotationDetails.party_name
          city.value = QuotationDetails.city
          customer_address.value = QuotationDetails.customer_address
          country.value = QuotationDetails.country
          users.value = QuotationDetails.owner
          phone.value = QuotationDetails.phone_no
          shipping_address_name.value = QuotationDetails.shipping_address_name
          state.value = QuotationDetails.state
          pincode.value = QuotationDetails.pincode
          inWord.value = QuotationDetails.in_words
          duedateValue.value = QuotationDetails.valid_till
          quotationTo.value = QuotationDetails.quotation_to
          order_type.value = QuotationDetails.order_type
          ship_addressLine1.value = QuotationDetails.ship_address_line1
          ship_addressLine2.value = QuotationDetails.ship_address_line2
          ship_city.value = QuotationDetails.ship_city
          ship_country.value = QuotationDetails.ship_country
          ship_phone.value = QuotationDetails.ship_phone
          ship_state.value = QuotationDetails.ship_state
          ship_pincode.value = QuotationDetails.ship_pincode

          breadcrumbsList.value[1].label = QuotationDetails.customer_name
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const toggleItemBox1 = () => {
      isItemBoxVisible1.value = !isItemBoxVisible1.value
    }

    const toggleItemBox2 = () => {
      isItemBoxVisible2.value = !isItemBoxVisible2.value
    }

    const toggleItemBox3 = () => {
      isItemBoxVisible3.value = !isItemBoxVisible3.value
    }


    const getTheme = (inputValue) => {
      if (inputValue === 'Cancelled') {
        return 'green';
      } else if (inputValue === 'Completed') {
        return 'blue';
      } else if (inputValue === 'Draft') {
        return 'red';
      } else if (inputValue === 'Closed') {
        return 'orange';
      } else {
        return 'gray';
      }
    }

    watch(
      () => route.params.id,
      async (newId) => {
        if (newId) {
          await fetchQuoteDetails()
        }
      }
    )

    onMounted(async () => {
      await fetchQuoteDetails()
    })

    return {
      isItemBoxVisible1,
      isItemBoxVisible2,
      isItemBoxVisible3,
      toggleItemBox1,
      toggleItemBox2,
      toggleItemBox3,
      isSidebarCollapsed,
      toggleSidebar,
      customerName,
      order_type,
      QuotationDetails,
      itemValue,
      users,
      datesValues,
      inputValue,          
      name,
      addressLine1,
      addressLine2,
      city,
      country,
      pincode,
      state,
      duedateValue,
      quotationTo,
      ship_addressLine1,
      ship_addressLine2,
      ship_city,
      ship_country,
      ship_pincode,
      ship_state,
      ship_phone,
      customer_address,
      shipping_address_name,
      phone,
      taxValue,
      getTheme,
      grandValue,
      totalTaxValue,
      inWord,
      breadcrumbsList
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
  margin-left: 218px;
  
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
  border-radius: 50%;
  border-width: var(--border-width, 2px);
}

.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.1s;
}
</style>
