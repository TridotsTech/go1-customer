<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full ">
           <AppHeader/>   
           
            <!-- Loading Spinner -->
            <div v-if="isLoading" class="flex justify-center items-center flex-1">
                   <Spinner class="w-8" />
               </div>

            <div  v-else class="detail flex-1 px-28 py-10 overflow-auto">
                <div class="hai border rounded">
                    <div class="px-5 flex border-b h-12 items-center justify-between">
                        <h1 class="text-2xl font-bold text-blue-600">{{ customerName }}</h1>
                        <div class="badge">
                            <Badge :variant="'subtle'" :theme="getTheme(inputValue)" size="sm" label="Badge">
                                {{ inputValue }}
                            </Badge>
                        </div>
                    </div>

                    <div class="main flex flex-row gap-6 pt-2">
                        <div class="w-1/2 p-2 min-h-70">
                            <div class="text-gray-700 mb-5 ml-1 flex h-7 max-w-fit cursor-pointer items-center gap-2 pl-2 pr-3 text-base font-semibold leading-5">
                                Details
                            </div>
                            <div class="flex items-center px-3 leading-5 first:mt-1 pb-1">
                                <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">Customer Name:</div>
                                <div class="grid min-h-[18px] flex-1 items-center text-base text-center">{{ customerName }}</div>
                            </div>
                            <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 pb-1">
                                <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">Date:</div>
                                <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center">{{ transactionDate }}</div>
                            </div>
                            <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt-3 pb-1">
                                <div class="sm:w-36 shrink-0 text-sm text-gray-600 text-left">Valid Date:</div>
                                <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-center">{{ validTill }}</div>
                            </div>
                        </div>

                        <div class="w-1/2 p-2 min-h-70">
                            <div class="text-gray-700 mb-5 ml-1 flex h-7 max-w-fit cursor-pointer items-center gap-4 pl-2 pr-3 text-base font-semibold leading-5">
                                Address & Contact
                            </div>
                            <div class="flex flex-col gap-2">
                                <div class="flex items-start gap-2 px-3 leading-5 first:mt-1 pb-1">
                                    <div class="sm:w-20 shrink-0 text-sm text-gray-600 text-left">Address:</div>
                                    <div class="grid min-h-[18px] flex-1 items-center text-base text-left">
                                        <div class="text-sm text-gray-900">
                                            <span v-if="addressLine1">{{ addressLine1 }}</span>
                                            <span v-if="addressLine2">{{ addressLine2 }}</span>
                                            <span v-if="city">{{ city }},</span>
                                            <span v-if="state">{{ state }},</span>
                                            <span v-if="country">{{ country }}</span>
                                            <span v-if="pincode">- {{ pincode }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2 px-3 leading-5 first:mt-3 text-center mt- 3 pb-1">
                                    <div class="sm:w-20 shrink-0 text-sm text-gray-600 text-left">Contact:</div>
                                    <div class="grid min-h-[18px] flex-1 items-center overflow-hidden text-base text-left">{{ phone }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white mt-6">
                        <div class="text-gray-700 mb-2 ml-5 flex h-7 max-w-fit cursor-pointer items-center gap-2 pr-3 text-base font-semibold leading-5">
                            Items
                        </div>
                        <table class="min-w-full border-b">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="px-6 w-96 overflow-hidden py-3 text-left text-xs  font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate(INR)</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount(INR)</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr v-for="(row, index) in itemValue" :key="index">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ row.item_name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ row.qty }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{{ row.rate }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{{ row.amount }}</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colspan="3">Item Total</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{{ totalValue }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="main flex mb-10 flex-row">
                        <div class="w-3/5 flex flex-col pr-4" style="max-height: 400px; overflow-y: auto;"></div>

                        <div class="w-2/5 flex flex-col">
                            <table class="min-w-full border-l border-gray-200">
                                <tbody class="bg-white">
                                    <tr>
                                        <td class="px-6 py-4 text-sm font-medium text-left border-b border-gray-200">Total Taxes and Charges</td>
                                        <td class="px-6 py-4 text-sm font-medium text-right border-b border-gray-200">{{ totalTaxValue }}</td>
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

                    <div v-if="taxValue && taxValue.length" class="taxes">
                        <div class="flex flex-col" style="max-height: 400px; overflow-y: auto;">
                            <div class="text-gray-700 p-5 flex h-7 max-w-fit cursor-pointer items-center gap-2 pr-3 text-base font-semibold leading-5">
                                Taxes
                            </div>
                            <table class="min-w-full border-t border-gray-200">
                                <thead>
                                    <tr>
                                        <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">Type</th>
                                        <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">Account Head</th>
                                        <th class="w-1/4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">Tax Rate</th>
                                        <th class="w-1 /4 px-4 py-2 text-sm font-medium text-gray-500 text-left border-b border-gray-200">Amount</th>
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
            </div>
        </div>
    </div>
</template>

<script setup>
import AppSidebar from '@/components/Layouts/AppSidebar.vue'
import AppHeader from '@/components/Layouts/AppHeader.vue'
import { createResource, Badge, Spinner } from 'frappe-ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const customerName = ref('')
const inputValue = ref('')
const transactionDate = ref('')
const validTill = ref('')
const addressLine1 = ref('')
const addressLine2 = ref('')
const city = ref('')
const state = ref('')
const country = ref('')
const pincode = ref('')
const phone = ref('')
const itemValue = ref([])
const totalValue = ref('')
const totalTaxValue = ref('')
const grandValue = ref('')
const inWord = ref('')
const taxValue = ref([])
const isLoading = ref(false);

const getTheme = (inputValue) => {
    if (inputValue === 'Cancelled') {
        return 'green';
    } else if (inputValue === 'Open') {
        return 'blue';
    } else if (inputValue === 'Draft') {
        return 'red';
    } else if (inputValue === 'Ordered') {
        return 'orange';
    } else {
        return 'gray';
    }
}

const route = useRoute()

const fetchQuotation = async () => {
    try {
        isLoading.value = true;
        const id = route.params.id

        const response = await createResource({
            url: 'go1_customer.go1_customer.api.api.get_quotation',
            method: 'get',
        }).fetch()

        const data = response.data
        const details = data.find((item) => item.name === id)

        if (details) {
            customerName.value = details.customer_name
            inputValue.value = details.status
            transactionDate.value = details.transaction_date
            validTill.value = details.valid_till
            addressLine1.value = details.address_line1
            addressLine2.value = details.address_line2
            city.value = details.city
            state.value = details.state
            country.value = details.country
            pincode.value = details.pincode
            phone.value = details.phone
            itemValue.value = details.items
            totalValue.value = details.total
            totalTaxValue.value = details.total_taxes_and_charges
            grandValue.value = details.grand_total
            inWord.value = details.in_words
            taxValue.value = details.taxes
        } else {
            console.error('details not found for id:', id)
        }
    } catch (error) {
        console.error('Error fetching the details:', error)
    }finally {
       isLoading.value = false;
   }
}

fetchQuotation()
</script>
