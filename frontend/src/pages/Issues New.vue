<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-3.5 pb-[2.625rem] sm:px-5 mb-12">
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content p-5" style="padding-left: 150px; padding-right: 150px;">
        <div class="bg-white border rounded-lg p-6 space-y-6 pb-[2.625rem]">
          <div class="float-left mb-1 text-xl font-bold text-gray-800 -mt-2" style="font-size: 1.35rem">
            <p>Issue</p>
            <p class="text-9xl font-bold text-gray-600" style="font-size: 1rem">
              {{ subject }}
            </p>
          </div>

          <div class="border-b pb-7 "></div>
          <div class="p-2">
            <FormControl :type="'text'" size="md" variant="subtle" placeholder="subject" label="Subject"
              v-model="subject" class="mb-5" />

            <TextEditor :fixedMenu="true" class="custom-editor " placeholder="Describe your problem..."
              @change="val => newTicket.description = val" />


            <div class="float-right flex gap-4 button-container">
              <Button :variant="'subtle'" theme="gray" size="md" label="Discard" @click="cancelEditing" />
              <Button :variant="'solid'" theme="gray" size="md" label="Submit" @click="createIssue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Breadcrumbs, Button, FormControl, TextEditor, createResource } from 'frappe-ui';

export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    FormControl,
    TextEditor
  },
  setup() {
    const router = useRouter();
    const isSidebarCollapsed = ref(false);
    const subject = ref('');
    const status = ref('');
    const newTicket = ref({
      description: ''
    });
    const priority = ref('');
    const customer = ref('');
    const priorityOption = ref([]);
    const breadcrumbsList = ref([
      { label: 'Issues', route: { name: 'issue' } },
      { label: 'Create Issue', route: {} },
    ]);

    const statusOptions = [
      { label: 'Open', value: 'Open' },
      { label: 'Closed', value: 'Closed' },
      { label: 'Replied', value: 'Replied' },
      { label: 'On Hold', value: 'On Hold' },
      { label: 'Resolved', value: 'Resolved' },
    ];

    const cancelEditing = () => {
      subject.value = '';
      status.value = '';
      newTicket.value.description = '';
      customer.value = '';
      priority.value = '';
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
        router.push({ name: 'issue' });
      } catch (error) {
        console.error('Error creating issue:', error);
      }
    };


    const fetchCustomers = async () => {
      const issues_customer = createResource({
        url: 'go1_customer.go1_customer.api.api.getcustomer',
        method: 'get',
        cache: ['true'],
        auto: ['true'],
      });

      try {
        const data = await issues_customer.fetch();
        if (data) {
          customer.value = data;
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };


    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    onMounted(async () => {
      await fetchCustomers();
    });

    return {
      isSidebarCollapsed,
      subject,
      status,
      newTicket,
      priority,
      customer,

      breadcrumbsList,
      statusOptions,
      cancelEditing,
      createIssue,
      toggleSidebar,
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
  height: 100vh;
  transition: margin-left 0.3s ease;
}

.main-content {
  flex-grow: 1;
  padding: 1.25rem;
  transition: margin-left 0.3s ease;
  margin-left: 220px;

}

.head-content {
  flex-grow: 1;
  padding: 0px;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
 
}

.collapsed .main-content {
  margin-left: 60px;
 
}

.collapsed .head-content {
  margin-left: 60px;
 
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border-width: var(--border-width, 2px);
 
}


.custom-editor {
  border: 1px solid #d1d5db;
  border-radius: 13px;
  min-height: 200px;
  overflow-y: auto;
  max-width: 100%;
  margin-bottom: 10px;
  display: block;
}



.float-right.flex {
  position: relative;
  bottom: 0;
  margin-top: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;  
  margin-top: 20px; 
}
</style>
