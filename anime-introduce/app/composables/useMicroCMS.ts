import { useRuntimeConfig } from "#imports";

type MicroImage = { url?: string };
type Anime = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: MicroImage;
  genres?: string[];
  year?: number;
  score?: number;
  studio?: string;
  status?: string;
};

export default function useMicroCMS() {
  const config = useRuntimeConfig();
  const domain = config.microCmsServiceDomain;
  const apiKey = config.microCmsApiKey;
  const base = `https://${domain}.microcms.io/api/v1`;

  async function fetchPage(limit = 100, offset = 0) {
    const res = await $fetch(`${base}/animes`, {
      headers: { "X-API-KEY": apiKey },
      query: { limit, offset },
    });
    return res;
  }

  async function getAllAnimes(): Promise<Anime[]> {
    const all: Anime[] = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const res: any = await fetchPage(limit, offset);
      if (res && res.contents) {
        all.push(...res.contents);
      }
      offset += limit;
      if (!res || !res.totalCount || offset >= res.totalCount) break;
    }
    return all;
  }

  async function getAnimeById(id: string): Promise<Anime | null> {
    try {
      const res = await $fetch(`${base}/animes/${id}`, {
        headers: { "X-API-KEY": apiKey },
      });
      return res;
    } catch (e) {
      return null;
    }
  }

  async function getGenres(): Promise<string[]> {
    const animes = await getAllAnimes();
    const s = new Set<string>();
    for (const a of animes) {
      (a.genres || []).forEach((g) => s.add(g));
    }
    return Array.from(s).sort();
  }

  function getListImageUrl(img?: MicroImage) {
    if (!img || !img.url) return "";
    return `${img.url}?w=400&h=560&fit=crop&fm=webp&q=75`;
  }

  function getDetailImageUrl(img?: MicroImage) {
    if (!img || !img.url) return "";
    return `${img.url}?w=800&fm=webp&q=85`;
  }

  function getLqipUrl(img?: MicroImage) {
    if (!img || !img.url) return "";
    return `${img.url}?w=20&fm=webp&q=30`;
  }

  return {
    getAllAnimes,
    getAnimeById,
    getGenres,
    getListImageUrl,
    getDetailImageUrl,
    getLqipUrl,
  };
}
