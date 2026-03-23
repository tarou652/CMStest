import { useRuntimeConfig } from "#imports";

export async function fetchAllAnimesForPrerender() {
  const config = useRuntimeConfig();
  const domain = config.microCmsServiceDomain;
  const apiKey = config.microCmsApiKey;
  const base = `https://${domain}.microcms.io/api/v1`;

  const all: string[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    // @ts-ignore
    const res: any = await $fetch(`${base}/animes`, {
      headers: { "X-API-KEY": apiKey },
      query: { limit, offset },
    });
    if (res && res.contents) {
      for (const c of res.contents) {
        all.push(`/anime/${c.id}`);
      }
    }
    offset += limit;
    if (!res || !res.totalCount || offset >= res.totalCount) break;
  }
  return all;
}
