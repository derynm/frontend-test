<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view />
      <v-alert
        v-if="errorStore.error"
        class="position-fixed top-0 right-0"
        style="z-index: 9999;"
        :text="errorStore.error"
        type="error"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useErrorStore } from './store/error';

const errorStore = useErrorStore()
</script>
