<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
            <AppHeader />

            <div class="flex-1 overflow-auto px-28 py-10">
                <div class="bg-white border rounded">
                    <div class="p-6 h-12 border-b flex justify-between items-center">
                        <p class="text-xl font-bold text-gray-800 mb-2">Issue</p>
                        <p class="text-gray-600 text-lg font-bold">{{ subject }}</p> 
                    </div>
                    

                    <div class="p-6 col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormControl :type="'text'" size="md" variant="subtle" placeholder="subject" label="Subject*"
                            v-model="subject" class="mb-5 col-span-2" />

                        <TextEditor :fixedMenu="true" class="custom-editor border rounded h-[200px] col-span-2"
                            placeholder="Describe your problem..." @change="val => newTicket.description = val" />

                        <div class="col-span-2 flex justify-end gap-4 ">
                            <Button :variant="'subtle'" theme="gray" size="sm" label="Discard"
                                @click="cancelEditing" />
                            <Button :variant="'solid'" theme="gray" size="sm" label="Submit" @click="createIssue" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {  FormControl, TextEditor, createResource } from 'frappe-ui';

// State variables
const subject = ref('');
const status = ref('');
const newTicket = ref({ description: '' });
const priority = ref('');
const customer = ref('');

const router = useRouter();

const cancelEditing = () => {
subject.value = '';
newTicket.value.description = '';

};

const createIssue = async () => {
const issueData = {
    subject: subject.value,
    status: status.value || 'Open',
    priority: priority.value || 'Medium',
    description: newTicket.value.description,
};
if (customer.value !== 'Administrator') {
    issueData.customer = customer.value;
}
try {
    const response = await fetch('/api/resource/Issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData),
    });

    if (!response.ok) throw new Error('Error creating issue');
    router.push({ name: 'Issues' });
} catch (error) {
    console.error('Error creating issue:', error);
}
};

const fetchCustomers = async () => {
const issues_customer = createResource({
    url: 'go1_customer.go1_customer.api.api.getcustomer',
    method: 'get',
});
try {
    const data = await issues_customer.fetch();
    if (data && data.length > 0) {

        customer.value = data[0];
    }
} catch (error) {
    console.error('Error fetching customer data:', error);
}
};





onMounted(async () => {
await fetchCustomers();
});
</script>
