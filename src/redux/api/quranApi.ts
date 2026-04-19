import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SurahQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

type Surah = {
  surahNumber: number;
  arabicName: string;
  englishName: string;
};

type SurahResponse = {
  success: boolean;
  data: Surah[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quran-backend-six.vercel.app/api",
  }),

  endpoints: (builder) => ({
    getSurahs: builder.query<
      SurahResponse,
      SurahQueryParams | void
    >({
      query: (params) => {
        const {
          page = 1,
          limit = 10,
          search = "",
        } = params || {};

        return `/surahs?page=${page}&limit=${limit}&search=${search}`;
      },
    }),
    getSingleSurah: builder.query({
      query: (id: string) =>
        `/surahs/${id}`,
    }),
  }),

  
});

 
 
export const {
  useGetSurahsQuery,
  useGetSingleSurahQuery,
} = quranApi;