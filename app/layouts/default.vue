<script setup lang="ts">
import AppFooter from '~/components/common/AppFooter.vue';
import AppNavBar from '~/components/common/AppNavBar.vue';

</script>

<template>
    <div class="min-h-screen flex flex-col bg-background">
      <AppNavBar />
      <main class="flex-1">
        <slot />
      </main>
      <AppFooter />
    </div>
  </template>