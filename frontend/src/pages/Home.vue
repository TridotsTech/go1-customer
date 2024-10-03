<template>
  <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
       <div class="head-content">
         <header class="border-b bg-white px-5 py-2.5 sm:px-5">
           Dashboard
         </header>
       </div>
     </div>
     <div :class="['layout', { collapsed: isSidebarCollapsed }]">
       <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
       
       <div class="main-content">
         <Dashboard/>
       </div>
 
    </div>
 </template>
 
 <script>
 import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
 import Dashboard from '@/dashboard/dashboard.vue'
 import { ref } from 'vue'
 
 export default {
   components: {
     LeftSidebar,
     Dashboard,
   },
   setup() {
     const isSidebarCollapsed = ref(false)
 
     const toggleSidebar = () => {
       isSidebarCollapsed.value = !isSidebarCollapsed.value
     }
 
     return {
       isSidebarCollapsed,
       toggleSidebar,
     }
   },
 }
 </script>
 
 <style scoped>
 .head -layout {
   display: flex;
   width: 100%;
   transition: margin-left 0.3s ease;
 } 
 .main-content {
   flex-grow: 1;
   padding: 1.25rem;
   transition: margin-left 0.3s ease;
   margin-left: 200px; 
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
 .list-row {
   display: flex;
   justify-content: space-between;
   padding: 10px;
   border-bottom: 1px solid #e5e7eb; 
 }
 
 .row:hover {
   background-color: #f9fafb;
 }
 </style> 