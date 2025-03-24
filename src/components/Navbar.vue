<template>
  <v-app-bar>
    <v-container>
      <v-app-bar-title
        class="font-weight-bold cursor-pointer"
        @click="router.push('/')"
      >
        Space X Rocket
      </v-app-bar-title>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

</script>
