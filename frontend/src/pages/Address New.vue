<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-5.5 pb-[2.625rem] sm:px-5 mb-12">
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">
        <div class="bg-white border rounded-lg p-6 space-y-6 pb-[2.625rem]  ml-[126px] mr-[120px]">
          <div class="flex justify-between">
            <div>
              <p class="text-2xl font-bold text-gray-800">Address</p>
              <p class="text-lg font-bold text-gray-600"></p>
            </div>
          </div>
          <div class="border-b pb-7 pt-5"></div>

        
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="Address Title *"
                v-model="address_title"
                class="mb-5"
                required
              />
              <FormControl
                :type="'select'"
                size="md"
                :options="address_typeOptions"
                variant="subtle"
                label="Address Type *"
                v-model="address_type"
                class="mb-5"
              />
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="Address Line 1 *"
                v-model="address_line1"
                class="mb-5"
                required
              />
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="Address Line 2"
                v-model="address_line2"
                class="mb-5"
              />
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="City *"
                v-model="city"
                class="mb-5"
              />
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="State"
                v-model="state"
                class="mb-5"
              />
            </div>

            <div>
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                label="Country *"
                v-model="country"
                class="mb-5"
              />
              <FormControl
                :type="'number'"
                size="md"
                variant="subtle"
                label="Postal Code"
                v-model="pincode"
                class="mb-5"
              />
              <FormControl
                :type="'email'"
                size="md"
                variant="subtle"
                label="Email"
                v-model="email_id"
                class="mb-5"
              />
              <FormControl
                :type="'number'"
                size="md"
                variant="subtle"
                label="Phone"
                v-model="phone"
                class="mb-5"
              />
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                placeholder="eg-33AAKFT6215C1ZH"
                label="GSTIN *"
                v-model="gstin"
                class="mb-5"
              />
            </div>
          </div>
          <div class="border-b pb-7 pt-5"></div>
          <div v-if="linkName" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormControl
                :type="'text'"
                size="md"
                :disabled="true"
                variant="subtle"
                label="Link Doctype"
                v-model="text"
                class="mb-5"
              />
            </div>

            <div>
              <FormControl
                :type="'text'"
                size="md"
                :disabled="true"
                variant="subtle"
                label="Link Name"
                v-model="linkName"
                class="mb-5"
              />
            </div>
          </div>
          <div class="flex justify-end gap-4 mt-4">
         
            <Button
              :variant="'subtle'"
              theme="gray"
              size="md"
              label="Discard"
              @click="cancelEditing"
            />
            <Button
              :variant="'solid'"
              theme="gray"
              size="md"
              label="Submit"
              @click="createIssue"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue';
import { ref, watch,onMounted } from 'vue';
import {  Breadcrumbs, Button, FormControl,createResource } from 'frappe-ui';
import { useRouter } from 'vue-router';

export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    FormControl,
  },
  setup() {
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
    const customOption = ref([]);    
    const phone = ref('');
    const gstin = ref('');
    const customer_name=ref('');
    const links_doctype = ref('');
    const link_name = ref('');

    const breadcrumbsList = ref([
      { label: 'Addresses', route: { name: 'addresses' } },
      { label: 'Create Address', route: {} },
    ]);

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
        link_doctype: 'Customer',
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

    router.push({ name: 'addresses' });
  } catch (error) {
    console.error('Error creating address:', error);
  }
};
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    
    const customerData = ref([]);

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

    watch(address_title, (newTitle) => {
      breadcrumbsList.value[1].label = newTitle;
    });
    onMounted(() => {
      fetchorder()
    })

   
    return {
      isSidebarCollapsed,
      country,
      address_list,
      state,
      customerData,
      text:'Customer',
      pincode,
      address_title,
      address_type,
      address_line1,
      customOption,
      city,
      email_id,
      phone,
      linkName,
      rows,
      gstin,
      address_line2,
      toggleSidebar,
      breadcrumbsList,
      address_typeOptions,
      cancelEditing,
      createIssue,
      links_doctype,
      link_name,
      customer_name,
    };
  },
};
</script>

<style scoped>
.head-layout {
  display: flex;
  width: 100%;
  transition: margin-left 0.3s ease;
}
.layout {
  display: flex;
  width: 100%;
  height: 120vh;
  transition: margin-left 0.3s ease;
}

.main-content {
  flex-grow: 1;
  padding: 1.25rem;
  transition: margin-left 0.3s ease;
  margin-left: 220px; /* Default width of sidebar */
}
.head-content {
  flex-grow: 1;
  padding: 0px;
  transition: margin-left 0.3s ease;
  margin-left: 220px; /* Default width of sidebar */
}
.collapsed .main-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
  .collapsed .head-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
</style>
