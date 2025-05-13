'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css'; // We'll create this next

export default function ThemedDatePicker() {
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration mismatch
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Select Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full px-3 py-2 bg-background border border-input text-foreground rounded-md shadow-sm"
        calendarClassName={theme === 'dark' ? 'dark-datepicker' : 'light-datepicker'}
        popperClassName="z-50"
      />
    </div>
  );
}
