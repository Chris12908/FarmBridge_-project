"use client";

import { useState, useRef, useEffect } from "react";
import { useProductAutocomplete } from "@/hooks/products/useProductAutocomplete";
import { cn } from "@/lib/utils";

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchAutocomplete({
  value,
  onChange,
  onSearch,
  placeholder = "Search fresh produce...",
  className,
}: SearchAutocompleteProps) {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { suggestions } = useProductAutocomplete(value);

  const showDropdown = focused && suggestions.length > 0 && value.length >= 2;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setFocused(false);
      onSearch(value);
    }
    if (e.key === "Escape") {
      setFocused(false);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    onChange(suggestion);
    setFocused(false);
    onSearch(suggestion);
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-xl pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(""); setFocused(true); }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-left transition-colors"
            >
              <span className="material-symbols-outlined text-base text-slate-400">history</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
