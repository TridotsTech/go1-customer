<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
            <AppHeader />
            <div class="dashboard  flex-1 overflow-auto px-28 py-10">
                <div class="bg-white border rounded-lg">
                    <div class="flex border-b h-12 justify-between items-center p-6">
                        <div>
                            <p class="text-9xl font-bold text-gray-800">Address</p>                            
                        </div>
                        <Button v-if="!isEditing" variant="solid" theme="gray" size="sm" label="Edit" :disabled="false" 
                            @click="startEditing" 
                        />
                    </div>
                
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        <div>
                            <FormControl type="text" size="md" variant="subtle" label="Address Title"
                                :disabled="!isEditing" v-model="address_title" class="mb-5" />
                            <FormControl type="select" size="md" :options="statusOptions" :disabled="!isEditing"
                                variant="subtle" label="Address Type" v-model="address_type" class="mb-5" />
                            <FormControl type="text" size="md" variant="subtle" label="Address Line 1"
                                :disabled="!isEditing" v-model="address_line1" class="mb-5" />
                            <FormControl type="text" size="md" variant="subtle" label="Address Line 2"
                                :disabled="!isEditing" v-model="address_line2" class="mb-5" />
                            <FormControl type="text" size="md" variant="subtle" label="City" :disabled="!isEditing"
                                v-model="city" class="mb-5" />
                            <FormControl type="text" size="md" variant="subtle" label="State" :disabled="!isEditing"
                                v-model="state" class="mb-5" />
                        </div>
                        <div>
                            <FormControl type="text" size="md" variant="subtle" :disabled="!isEditing" label="Country"
                                v-model="country" class="mb-5" />
                            <FormControl type="number" size="md" variant="subtle" :disabled="!isEditing"
                                label="Postal Code" v-model="pincode" class="mb-5" />
                            <FormControl type="email" size="md" variant="subtle" label="Email" :disabled="!isEditing"
                                v-model="email_id" class="mb-5" />
                            <FormControl type="number" size="md" variant="subtle" :disabled="!isEditing" label="Phone"
                                v-model="phone" class="mb-5" />
                            <FormControl type="text" size="md" :disabled="!isEditing" variant="subtle" label="GSTIN"
                                v-model="gstin" class="mb-5" />
                        </div>
                    </div>

                    <div>
                        <div v-if="isEditing"  class="flex justify-end gap-4 p-6">
                            <Button variant="subtle" theme="gray" size="sm" label="Discard" :disabled="false"
                                @click="cancelEditing" />
                            <Button variant="solid" theme="gray" size="sm" label="Submit" :disabled="false"
                                @click="submitChanges" />
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
import { createResource, FormControl } from 'frappe-ui';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();


const isEditing = ref(false);
const address_title = ref('');
const address_type = ref('');
const address_line1 = ref('');
const address_line2 = ref('');
const city = ref('');
const state = ref('');
const pincode = ref('');
const country = ref('');
const email_id = ref('');
const phone = ref('');
const gstin = ref('');
const links_doctype = ref('');
const link_name = ref('');
const name = ref(''); 

const issues = createResource({
    url: 'go1_customer.go1_customer.api.api.get_address',
    method: 'get',
});



const statusOptions = [
    { label: 'Billing', value: 'Billing' },
    { label: 'Shipping', value: 'Shipping' },

];

const fetchAddressDetails = async () => {
    try {
        const id = route.params.id;
        const response = await issues.fetch();
        const data = response.data;
        if (Array.isArray(data)) {
            const addressDetails = data.find((item) => item.name === id);
            if (addressDetails) {
                name.value = addressDetails.name;
                address_title.value = addressDetails.address_title;
                address_type.value = addressDetails.address_type;
                address_line1.value = addressDetails.address_line1;
                address_line2.value = addressDetails.address_line2;
                city.value = addressDetails.city;
                state.value = addressDetails.state;
                pincode.value = addressDetails.pincode;
                country.value = addressDetails.country;
                email_id.value = addressDetails.email_id;
                phone.value = addressDetails.phone;
                gstin.value = addressDetails.gstin;
                links_doctype.value = addressDetails.links_doctype;
                link_name.value = addressDetails.link_name;
            }
        }
    } catch (error) {
        console.error('Error fetching address details:', error);
    }
};


const startEditing = () => {
    isEditing.value = true;
};

const cancelEditing = () => {
    isEditing.value = false;
    fetchAddressDetails();
};

const submitChanges = async () => {
    const issueId = route.params.id;
    if (!issueId) return;

    const issueData = {
        address_title: address_title.value,
        address_type: address_type.value,
        address_line1: address_line1.value,
        address_line2: address_line2.value,
        city: city.value,
        state: state.value,
        pincode: pincode.value,
        country: country.value,
        email_id: email_id.value,
        phone: phone.value,
        gstin: gstin.value,
        links_doctype: links_doctype.value,
        link_name: link_name.value,
    };

    try {
        const response = await fetch(`/api/resource/Address/${issueId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issueData),
        });

        if (!response.ok) throw new Error('Error updating address');
        isEditing.value = false;
        router.push({ name: 'Addresses' });
    } catch (error) {
        console.error('Error updating address:', error);
    }
};



onMounted(() => {
    fetchAddressDetails();
});
</script>
