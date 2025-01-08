"use client";

import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between p-px w-full bg-white rounded-sm border border-black border-solid max-w-[550px] min-w-[100px] min-h-[42px]"
    >
      <div className="flex justify-center items-center px-4 py-3.5 h-full w-[45px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1613bad7eae6713503b2e08410037b3a146c14e1292119fbc67fe90a8233eb4?placeholderIfAbsent=true&apiKey=b4cab32bee1d480ba90be591a38899b3"
          alt=""
          className="object-contain self-stretch my-auto aspect-square w-[15px]"
        />
      </div>
      <div className="flex flex-1 items-center pr-1 h-full min-w-[50px]">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <input
          id="searchInput"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="flex-grow px-0.5 py-3 text-sm text-neutral-500 border-none focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2.5 text-xs font-medium tracking-wide leading-none text-center text-black uppercase bg-white border border-solid border-neutral-200 min-h-[32px] min-w-[75px]"
        >
          Search
        </button>
      </div>
    </form>
  );
};
