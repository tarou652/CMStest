<template>
  <v-chip-group v-model="internalSelected" row class="my-4">
    <v-chip value="すべて">すべて</v-chip>
    <v-chip v-for="g in genres" :key="g" :value="g">{{ g }}</v-chip>
  </v-chip-group>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps<{ genres: string[] }>();
const emit = defineEmits(["update:selectedGenre"]);

const internalSelected = ref("すべて");

watch(internalSelected, (v) => {
  emit("update:selectedGenre", v);
});
</script>
