<template>
    <div class="flex h-screen w-screen">
      <div class="h-full border-r bg-gray-50">
        <AppSidebar />
      </div>
      <div class="flex flex-1 flex-col h-full">
        <AppHeader />
        <div class="flex-1 overflow-auto p-6 ">
          <div class="project-detail border rounded-lg bg-white">
            <!-- Tab Navigation -->
            <div class="tabs flex mb-5 h-12 border-b  w-full px-4">
              <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name" :class="[
                'tab px-4 py-2 font-medium text-sm transition-colors',
                activeTab === tab.name
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              ]">
                {{ tab.label }}
              </button>
            </div>
  
  
            <!-- Project Overview Section with Enhanced Styles -->
            <section v-if="activeTab === 'Overview'" class="project-overview rounded-lg bg-white  p-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ projectName }}</h2>
              <p class="text-gray-600 mb-6 text-base">{{ Description }}</p>
              <div class="overview-info grid grid-cols-2 gap-4 text-sm border-t border-gray-200 pt-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14" />
                  </svg>
                  <p><strong>Status:</strong> <span class="text-gray-700">{{ Status }}</span></p>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M9 16h6" />
                  </svg>
                  <p><strong>Project Development:</strong> <span class="text-gray-700">{{ Company }}</span></p>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3M5 21h14M3 10h18M4 6h16" />
                  </svg>
                  <p><strong>Start Date:</strong> <span class="text-gray-700">{{ StartDate }}</span></p>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6V4m0 16v-2M6 12H4m16 0h-2m-6 6a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                  <p><strong>End Date:</strong> <span class="text-gray-700">{{ EndDate }}</span></p>
                </div>
              </div>
            </section>
  
  
            <!-- Project Details Section with Enhanced Styles -->
            <section v-if="activeTab === 'Details'" class="project-details bg-white  rounded-lg p-6">
              <h3 class="text-lg font-semibold mb-6 text-gray-800">Project Details</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
  
                <div class="border-r border-gray-200 pr-6">
                  <h4 class="text-base font-semibold mb-3 text-blue-600">Timeline & Milestones</h4>
                  <ul class="space-y-3">
                    <li v-for="milestone in [
                      { id: 1, name: 'Project Kickoff', status: projectKickoffStatus },
                      { id: 2, name: 'Design Phase', status: designPhaseStatus },
                      { id: 3, name: 'Development Phase', status: developmentPhase }
                    ]" :key="milestone.id" class="flex items-center">
                      <span class="text-gray-700">{{ milestone.name }}</span>
                      <span class="ml-auto text-xs font-semibold"
                        :class="milestone.status === 'Complete' ? 'text-green-500' : 'text-yellow-500'">
                        {{ milestone.status || 'Pending' }}
                      </span>
                    </li>
                  </ul>
                </div>
  
                <!-- Financials -->
                <div class=" border-gray-200 pr-6">
                  <h4 class="text-base font-semibold mb-3 text-green-600">Project Financials</h4>
                  <div class="space-y-3.5 text-gray-700">
                    <p><strong>Budget:</strong> <span class="text-gray-800">{{ Budget }}</span></p>
                    <p><strong>Spent:</strong> <span class="text-gray-800">{{ Spent }}</span></p>
                    <div class="relative w-full h-2 bg-gray-200 rounded mt-2">
                      <div class="absolute top-0 left-0 h-full bg-green-500 rounded"
                        :style="{ width: (Spent / Budget) * 100 + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
  
  
            <!-- Project Tasks Section with Enhanced Styles -->
            <section v-if="activeTab === 'Tasks'" class="project-tasks rounded-lg bg-white p-6">
              <h4 class="text-lg font-semibold mb-4 text-gray-700">Tasks & Activities</h4>
  
              <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-500">
                <p class="text-md font-semibold mb-5">No Tasks Found !</p>
                <FeatherIcon name="file-minus" class="h-15" />          
              </div>
  
              <ul v-else class="space-y-6">
                <li v-for="task in tasks" :key="task.name"
                  class="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
  
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center space-x-2">
                      <svg class="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m-6 0a9 9 0 11-2.292-7.708" />
                      </svg>
                      <strong class="text-gray-800 text-lg">{{ task.subject }}</strong>
                    </div>
                    <span :class="{
                      'bg-green-100 text-green-600': task.status === 'Completed',
                      'bg-yellow-100 text-yellow-600': task.status === 'Working',
                      'bg-red-100 text-red-600': task.status === 'Open'
                    }" class="px-2 py-0.5 rounded-full text-xs font-small">
                      {{ task.status || 'N/A' }}
                    </span>
                  </div>
  
                  <p class="text-gray-600 text-sm mb-4">Assigned to: <span class="font-semibold">{{ task._assign ||
                      'Unassigned' }}</span></p>
                  <p class="text-gray-500 text-xs">Due: <span class="text-gray-700 font-medium">{{ task.exp_end_date ||
                      'N/A' }}</span></p>
  
                  <div class="relative w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400"
                      :style="{ width: task.progress + '%' }"></div>
                  </div>
  
                  <div class="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Progress</span>
                    <span>{{ task.progress || 0 }}%</span>
                  </div>
  
                </li>
              </ul>
            </section>
  
  
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import AppSidebar from '@/components/Layouts/AppSidebar.vue';
  import AppHeader from '@/components/Layouts/AppHeader.vue';
  import { createResource } from 'frappe-ui';
  import { useRoute } from 'vue-router';
  
  const activeTab = ref('Overview');
  const projectName = ref('');
  const Description = ref('');
  const Status = ref('');
  const StartDate = ref('');
  const EndDate = ref('');
  const Company = ref('');
  const Budget = ref('');
  const Spent = ref('');
  const Completed = ref('');
  const tasks = ref([]);
  
  // Tabs for navigation
  const tabs = [
    { name: 'Overview', label: 'Overview' },
    { name: 'Tasks', label: 'Tasks & Activities' },
    { name: 'Details', label: 'Project Details' },
  ];
  
  const route = useRoute();
  
  const projectKickoffStatus = computed(() => {
    return tasks.value.some(task => task.progress > 0) ? 'Complete' : 'Pending';
  });
  const developmentPhase = computed(() => {
    const completedValue = parseFloat(Completed.value);
    return completedValue === 100 ? 'Complete' : 'In Process';
  });
  const designPhaseStatus = computed(() => {
    const completedValue = parseFloat(Completed.value);
    if (completedValue > 50) {
      return 'Complete';
    } else if (completedValue > 25) {
      return 'In Process';
    } else {
      return 'Pending';
    }
  });
  
  // Fetch project data
  const fetchProjects = async () => {
    try {
      const id = route.params.id;
      const response = await createResource({
        url: 'go1_customer.go1_customer.api.api.get_projects',
        method: 'get',
      }).fetch();
  
      const data = response.data;
      const details = data.find((item) => item.name === id);
      console.log('Project Details:', details);
  
      if (details) {
        projectName.value = details.project_name;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = details.notes;
        Description.value = tempDiv.innerText || tempDiv.textContent;
        Status.value = details.status;
        StartDate.value = details.expected_start_date;
        EndDate.value = details.expected_end_date;
        Company.value = details.company;
        Budget.value = details.estimated_costing;
        Spent.value = details.total_billed_amount;
        Completed.value = details.percent_complete;
  
        tasks.value = details.tasks || [];
      } else {
        console.error('Details not found for ID:', id);
      }
    } catch (error) {
      console.error('Error fetching the details:', error);
    }
  };
  
  fetchProjects();
  </script>
  