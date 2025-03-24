<template>
  <v-text-field
    v-model="searchValue"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    clearable
    density="comfortable"
    variant="outlined"
    @keyup.enter="onSearch"
    @click:clear="onClear"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchValue = ref<string>('');
const emit = defineEmits<{
  (e: 'search', term: string): void
}>();

const onSearch = () => {
  emit('search', searchValue.value);
};

const onClear = () => {
  searchValue.value = '';
  emit('search', '');
};
</script>
