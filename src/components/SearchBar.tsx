"use client";

type SearchBarProps = {
  text: string;
  setText: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function SearchBar({
  text,
  setText,
}: SearchBarProps) {
  return (
    <div className="p-4">
      <input
        className="border p-2 w-full rounded"
        placeholder="Search..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />
    </div>
  );
}