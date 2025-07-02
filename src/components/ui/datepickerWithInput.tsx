import { ChangeEvent, forwardRef, ReactNode, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '~/lib/utils';

interface DatePickerWithInputProps {
  value: string;
  onChange: (date: string) => void;
  min?: string;
  className?: string;
}

// Helper to check dd-mm-yyyy and if it's a real date
function isValidDDMMYYYY(val: string) {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(val)) return false;
  const [dayStr, monthStr, yearStr] = val.split('-');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return false;
  }
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Helper to convert Date to dd-mm-yyyy
function toDDMMYYYY(date: Date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

// Helper to convert dd-mm-yyyy to Date
function fromDDMMYYYY(val: string) {
  const [dayStr, monthStr, yearStr] = val.split('-');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return new Date('Invalid Date');
  }
  return new Date(year, month - 1, day);
}

export function DatePickerWithInput({
  value,
  onChange,
  min = '01-01-1900',
  className,
}: DatePickerWithInputProps) {
  const [open, setOpen] = useState(false);

  // For calendar, convert value to Date if valid
  const selectedDate = isValidDDMMYYYY(value) ? fromDDMMYYYY(value) : undefined;

  // For min date, convert to Date
  const minDate = isValidDDMMYYYY(min) ? fromDDMMYYYY(min) : new Date('1900-01-01');

  return (
    <div className={cn('relative flex w-[280px] items-center gap-2', className)}>
      <Input
        type="text"
        placeholder="dd-mm-jjjj"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          // Only allow empty or valid pattern
          if (val === '' || /^\d{0,2}-?\d{0,2}-?\d{0,4}$/.test(val)) {
            onChange(val);
          }
        }}
        className="w-full"
        inputMode="numeric"
        pattern="\d{2}-\d{2}-\d{4}"
        maxLength={10}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'absolute right-0 top-[50%] translate-y-[-50%] rounded-l-none font-normal',
              !value && 'text-muted-foreground'
            )}
            tabIndex={-1}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) onChange(toDDMMYYYY(date));
              setOpen(false);
            }}
            disabled={(date) => date < minDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
