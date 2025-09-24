import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../button.component";
import { Input } from "../input.component";
import type { SearchBarProps } from "./search-bar.types";

export function SearchBar({
  onSearch,
  className,
  placeholder,
  ...props
}: Readonly<SearchBarProps>) {
  const [search, setSearch] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(search);
  }

  return (
    <form
      className={twMerge("flex items-center gap-2", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <Input placeholder={placeholder} value={search} onChange={handleSearch} />
      <Button className="h-14 rounded-l-none" type="submit">
        Search
      </Button>
    </form>
  );
}
