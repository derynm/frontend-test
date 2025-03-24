<template>
  <v-card @click="toDetail()">
    <v-img
      height="200"
      :src="props.rocket.flickr_images[0]"
      cover
    />
    <v-card-title>
      <p>{{ props.rocket.name }}</p>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import type { Rocket } from '@/types';

const props = defineProps<{
  rocket: Rocket
}>()

const router = useRouter()
const toDetail = () => {
  router.push(`/${props.rocket.id}`)
}

</script>
