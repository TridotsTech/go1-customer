<template>
    <div v-if="dynamicsApp.data && dynamicsApp.data.length" class="grid grid-cols-1 gap-0.5">
        <div v-for="(row, index) in dynamicsApp.data" :key="index">
            <Button 
                @click="handleButtonClick(row.route)" 
                :variant="'ghost'" 
                theme="gray" 
                class="w-full text-gray-800"
                :class="{ 'border': isActive(row.route) }"
                :style="isActive(row.route) ? { backgroundColor: 'white',} : {}" >
                <!-- Collapsed View Icon -->
                <template v-if="isCollapsed">
                    <FeatherIcon class="w-4 text-black flex items-center" stroke="black" stroke-width="1" :name="row.icon" />
                </template>
                <!-- Expanded View -->
                <template v-else>
                    <div class="flex items-center ml-[-90px]">
                        <div style="float:left">
                            <FeatherIcon class="w-4 text-black" stroke="black" stroke-width="1" :name="row.icon" />
                        </div>
                        <div class="flex-shrink-0 text-sm duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;">
                            {{ row.title }}
                        </div>
                    </div>
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup>
import { Button, createResource } from 'frappe-ui';
import { defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false
    }
});

const dynamicsApp = createResource({
    url: 'go1_customer.go1_customer.api.api.get_navbar_routes',
    cache: ['route', 'title'],
    auto: true
});


const router = useRouter();
const route = useRoute(); 

const handleButtonClick = (routePath) => {
    router.push(routePath); 
};

const isActive = (routePath) => {
    return route.path === routePath;
};
</script>
