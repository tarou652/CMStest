<template>
  <v-container style="max-width: 960px; margin: auto">
    <AppHeader />

    <v-img :src="detailImage" :lazy-src="lqip" aspect-ratio="16/9" />

    <h1>{{ anime.title }}</h1>
    <div>
      <v-chip v-for="g in anime.genres" :key="g" class="ma-1">{{ g }}</v-chip>
    </div>

    <v-rating :model-value="anime.score" readonly />

    <div v-html="anime.description"></div>
  </v-container>
</template>

<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import useMicroCMS from "~/composables/useMicroCMS";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

const { getAnimeById, getDetailImageUrl, getLqipUrl } = useMicroCMS();
const { data } = await useAsyncData(`anime-${id}`, () => getAnimeById(id), {
  server: true,
});
const anime = data.value || {};

const detailImage = getDetailImageUrl(anime.thumbnail);
const lqip = getLqipUrl(anime.thumbnail);
</script>
