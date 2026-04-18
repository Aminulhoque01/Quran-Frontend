/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchAyahQuery } from "../redux/api/quranApi";
 

export default function SearchBar() {
  const [text, setText] = useState("");

  const { data } =
    useSearchAyahQuery(text);

  return (
    <div className="p-4">
      <input
        className="border p-2 w-full"
        placeholder="Search translation..."
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <div className="mt-4">
        {data?.data?.map(
          (item: any, i: number) => (
            <div key={i}>
              <p className="text-right text-xl">
                {item.ayahs?.arabicText}
              </p>

              <p>
                {item.ayahs?.translation}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}