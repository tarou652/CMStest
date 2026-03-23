<template>
  <v-container>
    <AppHeader />
    <GenreFilter :genres="genres" v-model:selectedGenre="selectedGenre" />

    <v-row>
      <v-col
        v-for="anime in pagedAnimes"
        :key="anime.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <AnimeCard :anime="anime" />
      </v-col>
    </v-row>

    <v-pagination v-model="page" :length="totalPages" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AppHeader from "~/app/components/AppHeader.vue";
import AnimeCard from "~/app/components/AnimeCard.vue";
import GenreFilter from "~/app/components/GenreFilter.vue";
import useMicroCMS from "~/app/composables/useMicroCMS";

const page = ref(1);
const perPage = 24;
const selectedGenre = ref<string | null>(null);

const { getAllAnimes, getGenres } = useMicroCMS();

const { data: animesData } = await useAsyncData(
  "all-animes",
  () => getAllAnimes(),
  { server: true },
);
const animes = animesData.value || [];

const { data: genresData } = await useAsyncData(
  "all-genres",
  () => getGenres(),
  { server: true },
);
const genres = genresData.value || [];

const filtered = computed(() => {
  if (!selectedGenre.value || selectedGenre.value === "すべて") return animes;
  return animes.filter((a) => (a.genres || []).includes(selectedGenre.value!));
});

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage));

const pagedAnimes = computed(() => {
  const start = (page.value - 1) * perPage;
  return filtered.value.slice(start, start + perPage);
});
</script>
