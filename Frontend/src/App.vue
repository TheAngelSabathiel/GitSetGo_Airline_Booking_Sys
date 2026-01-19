<script setup>
import { onBeforeMount, watch } from 'vue';
import Navbar from './components/NavbarComponent.vue';
import Footer from './components/FooterComponent.vue'; 


</script>

<template>
<div class="site-wrapper">
  <Navbar />
  <div class="main-content">
    <router-view />
  </div>
  <Footer />
</div>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
