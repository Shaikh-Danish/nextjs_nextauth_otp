'use client';

import React from 'react';

import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  handleChange?: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search vehicle...',
  handleChange,
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={event => handleChange?.(event.target.value)}
        className="peer w-full rounded-sm border border-gray-300 py-1 pl-2 pr-4 placeholder-gray-400 transition-all duration-200 hover:border-primary hover:text-primary focus:border-primary focus:outline-none"
      />
      <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-hover:text-primary peer-focus:text-primary" />
    </div>
  );
}
