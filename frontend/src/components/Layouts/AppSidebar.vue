<template>
    <div class="relative flex h-full flex-col justify-between transition-all duration-300 ease-in-out"
        :class="isSidebarCollapsed ? 'w-12' : 'w-[220px]'">
        <div class="head">
            <UserDropdown class="p-2" :isCollapsed="isSidebarCollapsed" />
        </div>

        <div class="flex-1 overflow-y-auto p-2">
            <SidebarLink :isCollapsed="isSidebarCollapsed" />
        </div>

        <div class="p-2 flex flex-col gap-1">
            <Button class=" w-full justify-start" @click="isSidebarCollapsed = !isSidebarCollapsed" :variant="'ghost'"
                size="sm">
                <template v-if="isSidebarCollapsed">
                    <CollapseSidebar class="h-4.5 w-4.5 text-gray-700 duration-300 ease-in-out"
                        :class="{ '[transform:rotateY(180deg)]': isSidebarCollapsed }" />
                </template>
                <template v-else>
                    <div class="flex items-center">
                        <div class="flex items-center ">
                            <span class="ml-[-93px]">
                                <CollapseSidebar />
                            </span>
                            <span class="ml-2">Collapse</span>
                        </div>
                    </div>
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import { Button } from 'frappe-ui';
import UserDropdown from '@/components/UserDropdown.vue'
import SidebarLink from '@/components/SidebarLink.vue'
import CollapseSidebar from '@/components/Icons/CollapseSidebar.vue'
const isSidebarCollapsed = useStorage('isSidebarCollapsed', false);
</script>