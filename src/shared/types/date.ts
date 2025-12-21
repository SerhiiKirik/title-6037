export interface DateInfo {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: number;
  month: string;
  isToday: boolean;
  isSelected: boolean;
}

export interface TimeSlot {
  label: string;
  value: number; // minutes from midnight
  disabled: boolean;
}
