import { useState } from 'react';
import { Plus, Bell, Calendar } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Header from '@/components/Header';
import CalendarGrid from '@/components/CalendarGrid';
import EventModal from '@/components/EventModal';
import FloatingActionButton from '@/components/FloatingActionButton';

const Index = () => {
  const {
    CurrentDate,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    monthCalendar,
    navigateMonth,
    goToToday
  } = useCalendar();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [editingEvent, setEditingEvent] = useState(undefined);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
  };

  const handleCreateEvent = () => {
    setSelectedDate(new Date());
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        
      </div>
    </SidebarProvider>
  )
};