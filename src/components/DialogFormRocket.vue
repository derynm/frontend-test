<script setup lang="ts">
import { ref } from "vue";
import type { inputRocket } from "@/types";

const emit = defineEmits(["save", "close"]);
const dialog = defineModel<boolean>("dialog", { default: false });

const formElement = ref<HTMLFormElement | null>(null);

const form = defineModel<inputRocket>("form", {});

const closeDialog = () => {
  dialog.value = false;
  emit("close");
};

const saveForm = async () => {
  if (formElement.value) {
    const { valid } = await formElement.value.validate();
    if (valid) {
      emit("save", form.value);
      closeDialog();
    }
  }
};

// Validation rules with dynamic field names
const requiredRule = (fieldName: string) => (value: any) =>
  !!value || `${fieldName} is required.`;

const urlRule = (fieldName: string) => (value: string) => {
  const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return pattern.test(value) || `${fieldName} must be a valid URL.`;
};

const numberRule = (fieldName: string) => (value: number) =>
  !isNaN(value) || `${fieldName} must be a number.`;

const percentageRule = (fieldName: string) => (value: number) =>
  (value >= 0 && value <= 100) || `${fieldName} must be between 0 and 100.`;
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <v-card>
      <v-card-title> Rocket Form </v-card-title>

      <v-card-text>
        <v-form ref="formElement">
          <v-text-field
            v-model="form!.name"
            label="Name"
            :rules="[requiredRule('Name')]"
            required
          />
          <v-text-field
            v-model="form!.type"
            label="Type"
            :rules="[requiredRule('Type')]"
            required
          />
          <v-switch
            v-model="form!.active"
            label="Active"
          />
          <v-text-field
            v-model.number="form!.stages"
            label="Stages"
            type="number"
            :rules="[requiredRule('Stages'), numberRule('Stages')]"
            required
          />
          <v-text-field
            v-model.number="form!.boosters"
            label="Boosters"
            type="number"
            :rules="[requiredRule('Boosters'), numberRule('Boosters')]"
            required
          />
          <v-text-field
            v-model.number="form!.cost_per_launch"
            label="Cost per Launch"
            type="number"
            prefix="$"
            :rules="[requiredRule('Cost per Launch'), numberRule('Cost per Launch')]"
            required
          />
          <v-text-field
            v-model.number="form!.success_rate_pct"
            label="Success Rate (%)"
            type="number"
            :rules="[
              requiredRule('Success Rate'),
              numberRule('Success Rate'),
              percentageRule('Success Rate'),
            ]"
            required
          />
          <v-text-field
            v-model="form!.first_flight"
            label="First Flight"
            type="date"
            :rules="[requiredRule('First Flight')]"
            required
          />
          <v-text-field
            v-model="form!.country"
            label="Country"
            :rules="[requiredRule('Country')]"
            required
          />
          <v-text-field
            v-model="form!.company"
            label="Company"
            :rules="[requiredRule('Company')]"
            required
          />
          <v-text-field
            v-model="form!.wikipedia"
            label="Wikipedia URL"
            type="url"
            :rules="[requiredRule('Wikipedia URL'), urlRule('Wikipedia URL')]"
            required
          />
          <v-textarea
            v-model="form!.description"
            label="Description"
            :rules="[requiredRule('Description')]"
            required
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="red"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue"
          @click="saveForm"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
