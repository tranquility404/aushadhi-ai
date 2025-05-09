'use client';

import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface SortingControlsProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: any) => void;
  options: Array<{
    id: string;
    label: string;
  }>;
}

export default function SortingControls({
  sortBy,
  sortOrder,
  onSortChange,
  options
}: SortingControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSortChange(option.id)}
          className={`px-3 py-1 text-sm rounded-md flex items-center ${
            sortBy === option.id
              ? 'bg-yellow-100 text-yellow-800 font-medium'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
          {sortBy === option.id && (
            <span className="ml-1">
              {sortOrder === 'asc' ? (
                <FaSortUp size={12} />
              ) : (
                <FaSortDown size={12} />
              )}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
