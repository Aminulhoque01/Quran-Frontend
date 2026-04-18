/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useGetSurahsQuery } from "../redux/api/quranApi";
import SearchBar from "../components/SearchBar";
 

export default function HomePage() {
  const { data, isLoading, error } =
    useGetSurahsQuery(undefined);

  if (isLoading)
    return <p>Loading...</p>;

  if (error)
    return <p>Error loading data</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4 p-6">
     
     <SearchBar/>

      {data?.data?.map((surah: any) => (
        <Link
          key={surah.surahNumber}
          href={`/surah/${surah.surahNumber}`}
          className="border p-4 rounded-xl shadow hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">
            {surah.englishName}
          </h2>

          <p className="text-right text-2xl">
            {surah.arabicName}
          </p>
        </Link>
      ))}
    </div>
  );
}