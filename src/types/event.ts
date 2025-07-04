export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'work' | 'personal' | 'meeting' | 'reminder';
  color?: string;
  participants?: string[];
  reminder?: number;
  isRecurring?: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: CalendarEvent['type'];
  participants: string;
  reminder: number;
  isRecurring: boolean;
  recurringType: string;
} 