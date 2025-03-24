<template>
  <v-container>
    <div
      class="mb-4"
    >
      <SearchInput @search="onSearch" />
      <v-btn @click="dialog = true">
        Open Form
      </v-btn>
    </div>
    <v-row v-if="!rocketStore.loading.getRockets">
      <v-col
        v-for="rocket in rocketStore.rockets"
        :key="rocket.id"
        cols="6"
      >
        <CardRocket
          :rocket="rocket"
        />
      </v-col>
    </v-row>

    <v-row v-if="rocketStore.loading.getRockets">
      <v-col cols="6">
        <v-skeleton-loader
          v-for="index in 4"
          :key="index"
          :elevation="2"
          height="200"
          type="card"
        />
      </v-col>
    </v-row>

    <DialogFormRocket
      v-model:dialog="dialog"
      v-model:form="formData"
      @save="handleSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useRocketStore } from '@/store/rocket';

import SearchInput from '@/components/SearchInput.vue';

const rocketStore = useRocketStore()

onMounted( () => {
  rocketStore.getRockets()
})

const dialog = ref(false);

const formData = ref({
  name: "",
  type: "",
  active: true,
  stages: 0,
  boosters: 0,
  cost_per_launch: 0,
  success_rate_pct: 0,
  first_flight: "",
  country: "",
  company: "",
  wikipedia: "",
  description: "",
});

const handleSave = (data: any) => {
  rocketStore.createRocket(data)
  dialog.value = false
};

const onSearch = (name: string) => {
  rocketStore.queryRocket(name)
}

</script>
