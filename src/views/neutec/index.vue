<template>
    <navbar />
    <sidebar />
    <router-view></router-view>
  </template>
  
  <script>
  import navbar from '@/components/layout/nav-bar.vue'
  import sidebar from '@/components/layout/sidebar.vue'
  export default {
    components: {
      navbar,
      sidebar
    },
  }
  </script>
  