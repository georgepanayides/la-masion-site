"use client";

import { useState } from "react";

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  minDate?: string;
}

export default function DatePicker({ selectedDate, onDateSelect, minDate }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const isDateDisabled = (dateStr: string) => {
    if (!minDate) return false;
    return new Date(dateStr) < new Date(minDate);
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const isSelected = (year: number, month: number, day: number) => {
    const dateStr = formatDateString(year, month, day);
    return selectedDate === dateStr;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDateString(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (!isDateDisabled(dateStr)) {
      onDateSelect(dateStr);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(currentMonth);
  const startDay = firstDayOfMonth(currentMonth);

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = formatDateString(year, month, day);
    const disabled = isDateDisabled(dateStr);
    const today = isToday(year, month, day);
    const selected = isSelected(year, month, day);

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={disabled}
        className={`aspect-square flex items-center justify-center text-sm transition-all duration-200 ${
          disabled
            ? 'text-stone-grey/30 cursor-not-allowed'
            : selected
            ? 'bg-stone-800 text-warm-white'
            : today
            ? 'border border-stone-800 text-sumi-ink hover:bg-stone-800/10'
            : 'text-stone-grey hover:bg-stone-800/10'
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-warm-white border border-stone-800/12 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 text-stone-grey hover:text-stone transition-all"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-sm uppercase tracking-wider text-sumi-ink">
          {monthNames[month]} {year}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-2 text-stone-grey hover:text-stone transition-all"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs uppercase tracking-wider text-stone-grey/70 font-light">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
}
