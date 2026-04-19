/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSurahsQuery } from "../redux/api/quranApi";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [page, setPage] = useState(1);

  const limit = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  const { data, isLoading, error } = useGetSurahsQuery({
    page,
    limit,
    search: debouncedText,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium animate-pulse">
          Loading Surahs...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">
          Error loading data
        </p>
      </div>
    );

  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Quran Surahs
        </h1>
        <p className="text-gray-500 mt-2">
          Browse and search all surahs beautifully
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar text={text} setText={setText} />
      </div>

      {/* Surah Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((surah: any) => (
          <Link
            key={surah.surahNumber}
            href={`/surah/${surah.surahNumber}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {surah.englishName}
              </h2>

              <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                #{surah.surahNumber}
              </span>
            </div>

            <p className="text-right text-3xl font-semibold text-green-600 mb-4">
              {surah.arabicName}
            </p>

            <p className="text-gray-500 text-sm">
              Click to read full surah →
            </p>
          </Link>
        ))}
      </div>

      {/* Professional Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white shadow hover:bg-gray-100"
          }`}
        >
          ← Prev
        </button>

        <div className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow">
          {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white shadow hover:bg-gray-100"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}