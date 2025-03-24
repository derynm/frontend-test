<template>
  <v-container v-if="!rocketStore.loading.getDetailRocket">
    <v-card>
      <v-img
        :src="rocketStore.rocket?.flickr_images[0]"
        height="300"
        cover
      />
      <v-card-title>{{ rocketStore.rocket?.name }}</v-card-title>
      <v-card-subtitle>{{ rocketStore.rocket?.company }} - {{ rocketStore.rocket?.country }}</v-card-subtitle>
      <v-card-text>
        <p>{{ rocketStore.rocket?.description }}</p>
        <v-btn
          :href="rocketStore.rocket?.wikipedia"
          target="_blank"
          color="blue"
          class="mt-2"
        >
          Learn More
        </v-btn>
      </v-card-text>
    </v-card>

    <v-tabs
      v-model="tab"
      class="mt-4"
    >
      <v-tab value="specs">
        Specifications
      </v-tab>
      <v-tab value="stages">
        Stages
      </v-tab>
      <v-tab value="engines">
        Engines
      </v-tab>
      <v-tab value="payload">
        Payload
      </v-tab>
    </v-tabs>

    <v-window
      v-model="tab"
      class="mt-3"
    >
      <v-window-item value="specs">
        <v-list>
          <v-list-item
            title="Height"
            :subtitle="`${rocketStore.rocket?.height.meters} m / ${rocketStore.rocket?.height.feet} ft`"
          />
          <v-list-item
            title="Mass"
            :subtitle="`${rocketStore.rocket?.mass.kg} kg / ${rocketStore.rocket?.mass.lb} lb`"
          />
          <v-list-item
            title="Cost per Launch"
            :subtitle="`$${rocketStore.rocket?.cost_per_launch.toLocaleString()}`"
          />
          <v-list-item
            title="Success Rate"
            :subtitle="`${rocketStore.rocket?.success_rate_pct}%`"
          />
          <v-list-item
            title="First Flight"
            :subtitle="rocketStore.rocket?.first_flight"
          />
        </v-list>
      </v-window-item>

      <v-window-item value="stages">
        <v-list>
          <v-list-item
            title="First Stage Engines"
            :subtitle="rocketStore.rocket?.first_stage.engines"
          />
          <v-list-item
            title="First Stage Burn Time"
            :subtitle="`${rocketStore.rocket?.first_stage.burn_time_sec} sec`"
          />
          <v-list-item
            title="Second Stage Engines"
            :subtitle="rocketStore.rocket?.second_stage.engines"
          />
          <v-list-item
            title="Second Stage Burn Time"
            :subtitle="`${rocketStore.rocket?.second_stage.burn_time_sec} sec`"
          />
        </v-list>
      </v-window-item>

      <v-window-item value="engines">
        <v-list>
          <v-list-item
            title="Engine Type"
            :subtitle="rocketStore.rocket?.engines.type"
          />
          <v-list-item
            title="Version"
            :subtitle="rocketStore.rocket?.engines.version"
          />
          <v-list-item
            title="Propellants"
            :subtitle="`${rocketStore.rocket?.engines.propellant_1} & ${rocketStore.rocket?.engines.propellant_2}`"
          />
          <v-list-item
            title="Thrust-to-Weight Ratio"
            :subtitle="rocketStore.rocket?.engines.thrust_to_weight"
          />
        </v-list>
      </v-window-item>

      <v-window-item value="payload">
        <v-list>
          <v-list-item
            title="Payload to LEO"
            :subtitle="`${rocketStore.rocket?.payload_weights[0].kg} kg / ${rocketStore.rocket?.payload_weights[0].lb} lb`"
          />
          <v-list-item
            title="Fairing Height"
            :subtitle="`${rocketStore.rocket?.second_stage.payloads.composite_fairing.height.meters} m`"
          />
          <v-list-item
            title="Fairing Diameter"
            :subtitle="`${rocketStore.rocket?.second_stage.payloads.composite_fairing.diameter.meters} m`"
          />
        </v-list>
      </v-window-item>
    </v-window>
  </v-container>

  <v-container v-else>
    <v-skeleton-loader
      type="card, article"
      class="mx-auto"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useRocketStore } from '@/store/rocket';

type Tab = 'specs' | 'stages' | 'engines' | 'payload';

const route = useRoute()
const rocketStore = useRocketStore()

const tab = ref<Tab>('specs');

onMounted(async () => {
  await rocketStore.getDetailRocket(route.params.id as string)
})
</script>
