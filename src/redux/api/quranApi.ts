import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://quran-backend-six.vercel.app/api`,
  }),

  endpoints: (builder) => ({
    // Get all surahs
    getSurahs: builder.query({
      query: () => "/surahs",
    }),

    // Single surah with ayahs
    getSingleSurah: builder.query({
      query: (id: string) =>
        `/surahs/${id}`,
    }),

    // Search ayah
    searchAyah: builder.query({
      query: (text: string) =>
        `/search?searchTerm=${text}`,
    }),
  }),
});

export const {
  useGetSurahsQuery,
  useGetSingleSurahQuery,
  useSearchAyahQuery,
} = quranApi;