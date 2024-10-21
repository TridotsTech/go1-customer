<template>
   
    <div class="flex  justify-between mx-5 ">
        <div class=" flex-[0_0_calc(25%_-_15px)] ">
            <OutstandingInvoice class="mx-auto" />
        </div>
        <div class="flex-[0_0_calc(25%_-_15px)]">
            <AverageOrderValue class="mx-auto" />
        </div>
        <div class="flex-[0_0_calc(25%_-_15px)]">
            <OpenIssues class="mx-auto" />
        </div>
        <div class="flex-[0_0_calc(25%_-_15px)]">
            <OpenOrders class="mx-auto" />
        </div>
    </div>

    <div class="flex flex-col md:flex-row mx-5 my-[20px] gap-[15px]">
        <div class="w-full md:w-1/2 flex flex-col justify-between border rounded p-4 min-w-[350px] min-h-[180px]">
            <h4 class="text-[12px] mb-5"><b>Month wise Spending</b></h4>
            <!-- <div class="border-t mt-2"></div> -->
            <div class="flex justify-center">
                <MonthWiseSpending />
            </div>
        </div>
        <div class="w-full md:w-1/2 flex flex-col justify-between border rounded p-4 min-w-[350px] min-h-[180px]">
            <h4 class="text-[12px] mb-5"><b>Frequently Purchased Products</b></h4>
            <!-- <div class="border-t mt-2"></div> -->
            <div class="flex justify-center">
                <FrequentlyPurchasedProducts class="w-auto" />
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row h-auto mx-5 mb-[5px] gap-[15px]">
        <div class="w-full md:w-1/2 flex flex-col justify-between border rounded p-4 min-w-[350px] min-h-[180px]">
            <h4 class="text-[12px] mb-5"><b>Spending By Product Category</b></h4>
            <!-- <div class="border-t mt-2"></div> -->
            <div class="flex justify-center">
                <SpendingByProductCategory class="w-full md:w-[220px]" />
            </div>
        </div>
        <div class="w-full md:w-1/2 flex flex-col justify-between border rounded p-4 min-w-[350px] min-h-[180px]">
            <h4 class="text-[12px] mb-5"><b>Order Status</b></h4>
            <!-- <div class="border-t mt-2"></div> -->
            <div class="flex justify-center">
                <OrderStatus class="w-full md:w-[220px]" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import FrequentlyPurchasedProducts from '@/dashboard/FrequentlyPurchasedProducts.vue';
import MonthWiseSpending from '@/dashboard/MonthWiseSpending.vue';
import SpendingByProductCategory from '@/dashboard/SpendingByProductCategory.vue';
import OutstandingInvoice from '@/dashboard/OutstandingInvoice.vue';
import AverageOrderValue from '@/dashboard/AverageOrderValue.vue';
import OpenIssues from '@/dashboard/OpenIssues.vue';
import OpenOrders from '@/dashboard/OpenOrders.vue';
import OrderStatus from '@/dashboard/OrderStatus.vue';

export default defineComponent({
    components: {
        FrequentlyPurchasedProducts,
        MonthWiseSpending,
        SpendingByProductCategory,
        OrderStatus,
        OutstandingInvoice,
        AverageOrderValue,
        OpenIssues,
        OpenOrders
    }
})
</script>
