<template>
    <div class="flex h-screen w-screen">
      <div class="h-full border-r bg-gray-50">
        <AppSidebar />
      </div>
      <div class="flex-1 flex flex-col h-full">
        <AppHeader>
          <template #addon>
            <Button variant="solid":label="('Create')">
                <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
            </Button>
          </template>
        </AppHeader>
        <div class="dashboard flex-1 overflow-auto py-10">
           Welcome to add on using Slot Function
        </div>
      </div>
    </div>
</template>

<script setup>
import AppSidebar from '@/components/Layouts/AppSidebar.vue'
import AppHeader from '@/components/Layouts/AppHeader.vue'
</script>
