<template>
  <v-card>
    <v-img :src="imageUrl" :lazy-src="lqip" aspect-ratio="2/3" />
    <v-card-title>{{ anime.title }}</v-card-title>
    <v-card-subtitle>{{ anime.year }} / {{ anime.studio }}</v-card-subtitle>
    <v-card-text>
      <v-chip v-for="g in anime.genres" :key="g" class="ma-1" small>{{
        g
      }}</v-chip>
    </v-card-text>
    <v-card-actions>
      <v-rating :model-value="anime.score" readonly />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ anime: any }>();
const props = defineProps<{ anime: any }>();
import useMicroCMS from "~/app/composables/useMicroCMS";
const { getListImageUrl, getLqipUrl } = useMicroCMS();
const imageUrl = getListImageUrl(props.anime.thumbnail);
const lqip = getLqipUrl(props.anime.thumbnail);
</script>
