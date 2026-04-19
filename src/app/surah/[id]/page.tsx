/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetSingleSurahQuery } from "@/src/redux/api/quranApi";

export default function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading } =
    useGetSingleSurahQuery(id);

  if (isLoading)
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-xl px-3 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold">
          {data?.data?.englishName}
        </h1>
      </div>

      {/* Ayahs */}
      {data?.data?.ayahs?.map((ayah: any) => (
        <div
          key={ayah.number}
          className="border-b pb-4"
        >
          <p className="text-right text-3xl leading-loose">
            {ayah.arabicText}
          </p>

          <p className="text-gray-700 mt-2">
            {ayah.translation}
          </p>
        </div>
      ))}
    </div>
  );
}