<template>
    <div class="h-16 px-5 flex items-center gap-3 ">       
            <TextInput type="search" size="sm" variant="subtle" placeholder="Name"  class="w-48" />
            <FormControl type="select" :options="[
                {},
                { label: 'Draft', value: 'Draft', }, { label: 'Open', value: 'Open', }, { label: 'Replied', value: 'Replied', },
                { label: 'Partially Ordered', value: 'Partially Ordered', }, { label: 'Ordered', value: 'Ordered', }, { label: 'Lost', value: 'Lost', },
                { label: 'Cancelled', value: 'Cancelled', }, { label: 'Expired', value: 'Expired', },
            ]" size="sm" variant="subtle" placeholder="Status"  class="w-48" />
            <TextInput type="search" size="sm" variant="subtle" placeholder="Total"  class="w-48" />
            <DatePicker class="!border-none w-48" size="md" variant="subtle" placeholder="Date" />

            <div class="flex ml-auto">
                <Button :variant="'subtle'" theme="gray" size="sm"> Reset</Button>
            </div>        
    </div>
   
</template>
<script setup>
import {TextInput, FormControl, DatePicker,Button } from 'frappe-ui'

</script>