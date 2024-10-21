<template>
        <div class="grid grid-cols-2 h-10 px-5 items-center border-b">
            <div class="flex items-center">
                <Breadcrumbs :items="breadcrumbs" v-if="breadcrumbs.length > 0" />
            </div>
            <div class="AddOn flex gap-2 justify-end">
                <slot name="addon" />
            </div>
        </div>
    </template>
    
    <script setup>
    import { computed } from 'vue';
    import { Breadcrumbs } from 'frappe-ui';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    
    const breadcrumbs = computed(() => {
        const pathSegments = route.fullPath.split('/').filter(segment => segment.trim() !== '');
        return pathSegments.map((segment, index) => {
            const path = '/' + pathSegments.slice(0, index + 1).join('/');
            return {
                label: segment,
                route: path
            };
        });
    });
    </script>
    