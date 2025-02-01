'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </div>
  );
}
