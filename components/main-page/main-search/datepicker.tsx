'use client';

import React, { useState } from 'react';

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty spaces for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateSelect = (day: number | null) => {
    if (day !== null) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      setSelectedDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      setShowCalendar(false);
    }
  };

  const days = getDaysInMonth(today.getFullYear(), today.getMonth());

  return (
    <div className="relative">
      {/* Date Input */}
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Select a date"
        value={selectedDate}
        readOnly
        onClick={() => setShowCalendar(!showCalendar)}
      />

      {/* Calendar */}
      {showCalendar && (
        <div className="absolute top-12 left-0 w-64 p-4 bg-white shadow-lg border rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">
              {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
            </h2>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center font-medium text-gray-500">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 text-center mt-2">
            {days.map((day, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer rounded-md ${
                  day === today.getDate() ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                } ${day ? '' : 'invisible'}`}
                onClick={() => handleDateSelect(day)}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
