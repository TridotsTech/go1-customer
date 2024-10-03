<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-6.5 pb-[2.625rem] sm:px-5 mb-12">
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content">
        <div class="bg-white shadow-md rounded-lg p-6 space-y-6 pb-[2.625rem] ml-[126px] mr-[120px]">
          <div class="float-left mb-1 text-9xl font-bold text-gray-800 -mt-2" style="font-size: 1.85rem">
            <p>Address</p>
            <p class="text-9xl font-bold text-gray-600" style="font-size: 1rem">
              {{ subject }}
            </p>
          </div>
          <div class="float-right mb-1">
            <Button
              v-if="!isEditing"
              variant="solid"
              theme="gray"
              size="md"
              label="Edit"
              :disabled="false"
              @click="startEditing"
            />
          </div>
          <div class="border-b pb-7 pt-10"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Title"
                :disabled="!isEditing"
                v-model="address_title"
                class="mb-5"
              />
              <FormControl
                type="select"
                size="md"
                :options="statusOptions"
                :disabled="!isEditing"
                variant="subtle"
                label="Address Type"
                v-model="address_type"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line 1"
                :disabled="!isEditing"
                v-model="address_line1"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line 2"
                :disabled="!isEditing"
                v-model="address_line2"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="City"
                :disabled="!isEditing"
                v-model="city"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="State"
                :disabled="!isEditing"
                v-model="state"
                class="mb-5"
              />
            </div>

            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                :disabled="!isEditing"
                label="Country"
                v-model="country"
                class="mb-5"
              />
              <FormControl
                type="number"
                size="md"
                variant="subtle"
                :disabled="!isEditing"
                label="Postal Code"
                v-model="pincode"
                class="mb-5"
              />
              <FormControl
                type="email"
                size="md"
                variant="subtle"
                label="Email"
                :disabled="!isEditing"
                v-model="email_id"
                class="mb-5"
              />
              <FormControl
                type="number"
                size="md"
                variant="subtle"
                :disabled="!isEditing"
                label="Phone"
                v-model="phone"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                :disabled="!isEditing"
                variant="subtle"
                label="GSTIN"
                v-model="gstin"
                class="mb-5"
              />
            </div>
          </div>
          <div class="border-b pb-7 pt-5"></div>
          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormControl
                type="text"
                size="md"
                :disabled="true"
                variant="subtle"
                label="Link Doctype"
                class="mb-5"
              ></FormControl>
            </div>

            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                :disabled="true"
                label="Link Name"
                v-model="link_name"
                class="mb-5"
              />
            </div>
          </div> -->
          <div>
            <div v-if="isEditing" class="float-right flex gap-4">
              <Button
                variant="subtle"
                theme="gray"
                size="md"
                label="Discard"
                :disabled="false"
                @click="cancelEditing"
              />
              <Button
                variant="solid"
                theme="gray"
                size="md"
                label="Submit"
                :disabled="false"
                @click="submitChanges"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue';
import { ref, watch, onMounted } from 'vue';
import { createResource, Breadcrumbs, Button, FormControl } from 'frappe-ui';
import { useRouter, useRoute } from 'vue-router';

export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    FormControl,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const isSidebarCollapsed = ref(false);
    const isEditing = ref(false);
    const address_title = ref('');
    const address_type = ref('');
    const address_line1 = ref('');
    const address_line2 = ref('');
    const name = ref('')
    const city = ref('');
    const state = ref('');
    const pincode = ref('');
    const country = ref('');
    const email_id = ref('');
    const phone = ref('');
    const gstin = ref('');
    const links_doctype = ref('');
    const link_name = ref('');

    const issues = createResource({
      url: 'go1_customer.go1_customer.api.api.get_address',
      method: 'get',
    });

    const breadcrumbsList = ref([
      { label: 'Addresses', route: { name: 'addresses' } },
      { label: 'New', route: {} },
    ]);

    const statusOptions = [
      { label: 'Billing', value: 'Billing' },
      { label: 'Shipping', value: 'Shipping' },
      // ... other options
    ];

    const fetchAddressDetails = async () => {
      try {
        const id = route.params.id;
        const data = await issues.fetch();
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
        router.push({ name: 'addresses' }); // Redirect after successful update
      } catch (error) {
        console.error('Error updating address:', error);
      }
    };

    watch(name, (newTitle) => {
  breadcrumbsList.value[1].label = newTitle;
});

    onMounted(() => {
      fetchAddressDetails();
    });

    return {
      isSidebarCollapsed,
      isEditing,
      address_title,
      address_type,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
      email_id,
      phone,
      gstin,
      links_doctype,
      link_name,
      breadcrumbsList,
      statusOptions,
      startEditing,
      cancelEditing,
      submitChanges,
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
  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border-width: var(--border-width, 2px); /* Use dynamic border width */
  }
  @media (max-width: 250px) {
    .main-content {
      margin-left: 60px;
    }
  }
  </style>
    