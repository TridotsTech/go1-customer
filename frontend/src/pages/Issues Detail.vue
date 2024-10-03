<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white h-12 py-2.5 pb-[2.625rem] sm:px-5 mb-12">
          <Breadcrumbs :items="breadcrumbsList" class="float-left" />
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      <div class="main-content" style="padding-left: 150px; padding-right: 150px;">
        <div class="bg-white border rounded-lg p-6 space-y-6  pb-[2.625rem]">
          <div class="float-left mb-1 text-9xl font-bold text-gray-800 -mt-2" style="font-size: 1.85rem">
            <p>Issue</p>
            <p class="text-9xl font-bold text-gray-600" style="font-size: 1rem">
              {{ subject }}
            </p>
          </div>
          <div class="float-right mb-1">
            <Button v-if="!isEditing" :variant="'solid'" theme="gray" size="md" label="Edit" :disabled="false"
              @click="startEditing" class="" />
          </div>
          <div class="border-b pb-7 pt-8"></div>
          <div class="p-2">
            <FormControl :type="'text'" size="md" variant="subtle" placeholder="subject" :disabled="!isEditing"
              label="Subject" v-model="subject" class="mb-5" />       

            <div><label class="block text-base mb-2 text-gray-600" for="frappe-ui-1">Description</label>
              <Textarea :type="'textarea'" :size="'sm'" variant="subtle" placeholder="Placeholder" :disabled="!isEditing"
                label="Description" class=" mb-5  h-[200px]" v-model="description"  />
            </div>
            <div v-if="isEditing" class="float-right flex gap-4  ">
              <Button :variant="'subtle'" theme="gray" size="md" label="Discard" :disabled="false"
                @click="cancelEditing" />
              <Button :variant="'solid'" theme="gray" size="md" label="Submit" :disabled="false"
                @click="submitChanges" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import { ref, watch, onMounted } from 'vue'
import { createResource, Breadcrumbs, Button, FormControl, TextEditor, Textarea } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: {
    LeftSidebar,
    Breadcrumbs,
    Button,
    FormControl,
    TextEditor,
    Textarea
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isSidebarCollapsed = ref(false)
    const isEditing = ref(false)
    const name = ref('')
    const status = ref('')
    const description = ref('')
    const priority = ref('')
    const customer = ref('')
    const subject = ref('')

    const customOption = ref([])
    const priorityOption = ref([])

    const issues = createResource({
      url: 'go1_customer.go1_customer.api.api.get_issues',
      method: 'get',
    })



    const breadcrumbsList = ref([
      { label: 'Issues', route: { name: 'issue' } },
      { label: 'New', route: {} },
    ])

    const statusOptions = [
      { label: 'Open', value: 'Open' },
      { label: 'Closed', value: 'Closed' },
      { label: 'Replied', value: 'Replied' },
      { label: 'On Hold', value: 'On Hold' },
      { label: 'Resolved', value: 'Resolved' },
    ]

    const fetchIssueDetails = async () => {
      try {
        const id = route.params.id
        const data = await issues.fetch()
        const issueDetails = data.find((item) => item.name === id)
        if (issueDetails) {
          name.value = issueDetails.name
          subject.value = issueDetails.subject
          status.value = issueDetails.status
          description.value = issueDetails.description.replace(
            /<\/?[^>]+>/gi,
            ''
          )          
          customer.value = issueDetails.customer
          priority.value = issueDetails.priority
        }
      } catch (error) {
        console.error('Error fetching issue details:', error)
      }
    }

    const startEditing = () => {
      isEditing.value = true
    }

    const cancelEditing = () => {
      isEditing.value = false
      fetchIssueDetails()
    }

    const submitChanges = async () => {
      const issueId = route.params.id
      if (!issueId) return

      const issueData = {
        subject: subject.value,
        status: status.value,
        priority: priority.value,
        description: description.value,
        customer: customer.value,
      }
     

      try {
        const response = await fetch(`/api/resource/Issue/${issueId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(issueData),
        })

        if (!response.ok) throw new Error('Error updating issue')
        isEditing.value = false
        router.push({ name: 'issue' })
      } catch (error) {
        console.error('Error updating issue:', error)
      }
    }

    const optionsCustomer = async () => {
      try {
        const response = await fetch('/api/resource/Customer?fields=["name"]')
        if (!response.ok) throw new Error('Network response was not ok')

        const customerdata = await response.json()
        customOption.value = customerdata.data.map((users) => users.name) || []
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    const optionsPriority = async () => {
      try {
        const response = await fetch(
          '/api/resource/Issue Priority?fields=["name"]'
        )
        if (!response.ok) throw new Error('Network response was not ok')

        const prioritydata = await response.json()
        priorityOption.value =
          prioritydata.data.map((users) => users.name) || []
        
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    watch(name, (newName) => {
      breadcrumbsList.value[1].label = newName
    })

    onMounted(async () => {
      await fetchIssueDetails()
      await optionsCustomer()
      await optionsPriority()
    })
    return {
      isSidebarCollapsed,
      priorityOption,
      isEditing,
      name,
      status,
      subject,
      description,
      priority,
      customer,
      customOption,
      toggleSidebar,
      breadcrumbsList,
      statusOptions,
      optionsCustomer,
      optionsPriority,
      startEditing,
      cancelEditing,
      submitChanges,
    }
  },
}
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
  margin-left: 220px;
  /* Default width of sidebar */
}

.head-content {
  flex-grow: 1;
  padding: 0px;
  transition: margin-left 0.3s ease;
  margin-left: 220px;
  /* Default width of sidebar */
}

.collapsed .main-content {
  margin-left: 60px;
  /* Adjust when sidebar is collapsed */
}

.collapsed .head-content {
  margin-left: 60px;
  /* Adjust when sidebar is collapsed */
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border-width: var(--border-width, 2px);
  /* Use dynamic border width */
}



/* Text editor styles */
.custom-editor {
  border: 1px solid #d1d5db;
  border-radius: 13px;
  height: 200px;
  /* Set height to 200px */
  overflow-y: auto;
  width: 100%;
  margin-bottom: 10px;
  display: block;
  resize: both;
  /* Allow resizing */
}

.custom-textarea {
  height: 600px;
  /* Set height */
  width: 100%;
  /* Ensure full width */
}






@media (max-width: 250px) {
  .main-content {
    margin-left: 60px;
  }
}
</style>