<template>
    <Button :label="label" @click="handleRefresh" :loading="isLoading">
      <template #icon>
        <FeatherIcon class="w-4" name="refresh-cw" />
      </template>
    </Button>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { FeatherIcon } from 'frappe-ui'
  
  
  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['refresh'])
  const label = 'Refresh'
  const handleRefresh = () => {
    emit('refresh')
  }
  </script>
  