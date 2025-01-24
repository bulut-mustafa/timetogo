'use client';

import { useState } from 'react';

const citiesAndCountries = [
  'New York, USA',
  'London, UK',
  'Paris, France',
  'Istanbul, Turkey',
  'Madrid, Spain',
  'Rome, Italy',
  'Cairo, Egypt',
  'Bangkok, Thailand',
  'Dubai, UAE',
  'Tokyo, Japan',
];

export default function AutocompleteCombobox() {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const matches = citiesAndCountries.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(matches);
      setIsDropdownVisible(true);
    } else {
      setFilteredOptions([]);
      setIsDropdownVisible(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setQuery(option);
    setIsDropdownVisible(false);
  };

  const handleBlur = () => {
    // Close dropdown after a short delay to allow option selection
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Input Field */}
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter city or country"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={handleBlur}
      />

      {/* Dropdown */}
      {isDropdownVisible && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
