<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
            <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
            <AppHeader />
            <div class="dashboard flex-1 overflow-auto px-28 py-10">
                <div class="bg-white border rounded-lg">
                    <div class="flex border-b h-12 justify-between items-center p-6">
                        <div>
                            <p class="text-9xl font-bold text-gray-800" >Issue</p>                                                     
                        </div>
                        <Button v-if="!isEditing" variant="solid" theme="gray" size="sm" label="Edit" :disabled="false" 
                            @click="startEditing" 
                        />
                    </div>
                    <div class="p-6">
                        <FormControl type="text" size="md" variant="subtle" placeholder="subject" :disabled="!isEditing" label="Subject" v-model="subject" class="mb-5" />
                        <div>
                            <label class="block text-base text-gray-600" for="frappe-ui-1">Description</label>
                            <Textarea type="textarea" size="sm" variant="subtle" placeholder="Placeholder" :disabled="!isEditing" label="Description" class="h-[200px]" v-model="description" />
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
import { ref, onMounted } from 'vue'
import { createResource,  FormControl, Textarea } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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


const fetchIssueDetails = async () => {
    try {
        const id = route.params.id;
        const response = await issues.fetch();   
        const data = response.data;
      
        if (Array.isArray(data)) {
            const issueDetails = data.find((item) => item.name === id);
            if (issueDetails) {
                name.value = issueDetails.name;
                subject.value = issueDetails.subject;
                status.value = issueDetails.status;
                description.value = issueDetails.description.replace(/<\/?[^>]+>/gi, '');
                customer.value = issueDetails.customer;
                priority.value = issueDetails.priority;
            } 
        } 
    } catch (error) {
        console.error('Error fetching issue details:', error);
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
        router.push({ name: 'Issues' })
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
        const response = await fetch('/api/resource/Issue Priority?fields=["name"]')
        if (!response.ok) throw new Error('Network response was not ok')

        const prioritydata = await response.json()
        priorityOption.value = prioritydata.data.map((users) => users.name) || []
    } catch (error) {
        console.error('Error fetching customers:', error)
    }
}


onMounted(async () => {
    await fetchIssueDetails()
    await optionsCustomer()
    await optionsPriority()
})
</script>
