<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
            <AppHeader />
            <div class="dashboard  flex-1 overflow-auto px-28 py-10">
                <div class="bg-white border rounded-lg  ">
                    <div class="h-12 px-6 border-b flex items-center">
                        <div>
                            <p class="text-2xl font-bold text-gray-800">Address</p>                           
                        </div>
                    </div>

                    <div class="grid pt-5 p-6 grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FormControl :type="'text'" size="md" variant="subtle" label="Address Title *"
                                v-model="address_title" class="mb-5" required />
                            <FormControl :type="'select'" size="md" :options="address_typeOptions" variant="subtle"
                                label="Address Type *" v-model="address_type" class="mb-5" />
                            <FormControl :type="'text'" size="md" variant="subtle" label="Address Line 1 *"
                                v-model="address_line1" class="mb-5" required />
                            <FormControl :type="'text'" size="md" variant="subtle" label="Address Line 2"
                                v-model="address_line2" class="mb-5" />
                            <FormControl :type="'text'" size="md" variant="subtle" label="City *" v-model="city"
                                class="mb-5" />
                            <FormControl :type="'text'" size="md" variant="subtle" label="State" v-model="state"
                                class="mb-5" />
                        </div>

                        <div>
                            <FormControl :type="'text'" size="md" variant="subtle" label="Country *" v-model="country"
                                class="mb-5" />
                            <FormControl :type="'number'" size="md" variant="subtle" label="Postal Code"
                                v-model="pincode" class="mb-5" />
                            <FormControl :type="'email'" size="md" variant="subtle" label="Email" v-model="email_id"
                                class="mb-5" />
                            <FormControl :type="'number'" size="md" variant="subtle" label="Phone" v-model="phone"
                                class="mb-5" />
                            <FormControl :type="'text'" size="md" variant="subtle" placeholder="eg-33AAKFT6215C1ZH"
                                label="GSTIN *" v-model="gstin" class="mb-5" />
                        </div>
                    </div>
                    
                    <div v-if="linkName" class="grid grid-cols-1 p-6 md:grid-cols-2 gap-6">
                        <div>
                            <FormControl :type="'text'" size="md" :disabled="true" variant="subtle" label="Link Doctype"
                                v-model="text" />
                        </div>

                        <div>
                            <FormControl :type="'text'" size="md" :disabled="true" variant="subtle" label="Link Name"
                                v-model="linkName" />
                        </div>
                    </div>
                    <div class="flex justify-end gap-4 p-6">
                        <Button :variant="'subtle'" theme="gray" size="sm" label="Discard" @click="cancelEditing" />
                        <Button :variant="'solid'" theme="gray" size="sm" label="Submit" @click="createIssue" />
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
import { FormControl, createResource } from 'frappe-ui';
import { useRouter } from 'vue-router'

const router = useRouter();
const isSidebarCollapsed = ref(false);
const address_title = ref('');
const address_type = ref('');
const isLoading = ref(false);
const address_line1 = ref('');
const address_line2 = ref('');
const city = ref('');
const state = ref('');
const pincode = ref('');
const country = ref('');
const email_id = ref('');
const linkName = ref('');
const rows = ref('');
const phone = ref('');
const gstin = ref('');
const links_doctype = ref('');
const link_name = ref('');
const text = ref('Customer');

const cancelEditing = () => {
    address_title.value = '';
    address_type.value = '';
    address_line1.value = '';
    address_line2.value = '';
    city.value = '';
    state.value = '';
    pincode.value = '';
    country.value = '';
    email_id.value = '';
    phone.value = '';
    gstin.value = '';
    links_doctype.value = '';
    link_name.value = '';
};

const createIssue = async () => {
  if (!gstin.value || !address_title.value || !address_type.value || !city.value || !country.value || !address_line1.value) {
    alert('Please fill in all required fields');
    return;
  }

  const addressData = {
    address_title: address_title.value,
    address_type: address_type.value,
    city: city.value,
    address_line1: address_line1.value,
    address_line2: address_line2.value,
    state: state.value,
    pincode: pincode.value,
    country: country.value,
    email_id: email_id.value,
    phone: phone.value,
    gstin: gstin.value,    
  };
  if (linkName.value) {
    addressData.links = [
      {
        link_doctype: text,
        link_name: linkName.value,
      },
    ];
  }
  try {
    const response = await fetch('/api/resource/Address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating address: ${errorText}`);
    }

    router.push({ name: 'Addresses' });
  } catch (error) {
    console.error('Error creating address:', error);
  }
};
const address_list = createResource({
  url: 'go1_customer.go1_customer.api.api.getcustomer',  
  auto: true,
});

const fetchorder = async () => {
      try {
        isLoading.value = true
        const data = await address_list.fetch()
        rows.value = data
        console.log('Fetched data:', rows.value)
        linkName.value = rows.value[0];
        console.log('Link Name:', linkName.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }finally {
        isLoading.value = false
      }
    }  
    onMounted(() => {
      fetchorder()
    })

const address_typeOptions = [
    { label: 'Billing', value: 'Billing' },
    { label: 'Shipping', value: 'Shipping' },
    { label: 'Office', value: 'Office' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Postal', value: 'Postal' },
    { label: 'Shop', value: 'Shop' },
    { label: 'Subsidiary', value: 'Subsidiary' },
    { label: 'Warehouse', value: 'Warehouse' },
    { label: 'Current', value: 'Current' },
    { label: 'Permanent', value: 'Permanent' },
    { label: 'Other', value: 'Other' },
];

</script>
