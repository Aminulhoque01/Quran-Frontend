/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import { useGetSingleSurahQuery } from "@/src/redux/api/quranApi";

export default function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ unwrap params safely

  const { data, isLoading } = useGetSingleSurahQuery(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {data?.data?.englishName}
      </h1>

      {data?.data?.ayahs?.map((ayah: any) => (
        <div key={ayah.number} className="border-b pb-4">
          <p className="text-right text-3xl">
            {ayah.arabicText}
          </p>

          <p className="text-gray-700">
            {ayah.translation}
          </p>
        </div>
      ))}
    </div>
  );
}