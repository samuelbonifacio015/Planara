import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  color?: string;
  category?: string;
}

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Obtener el calendario del mes actual
  const monthCalendar = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  // Navegación de meses
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  // Ir a hoy
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Agregar evento
  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // Actualizar evento
  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  };

  // Eliminar evento
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Obtener eventos por fecha
  const getEventsByDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Obtener eventos del mes actual
  const getMonthEvents = () => {
    return events.filter(event => isSameMonth(event.date, currentDate));
  };

  // Formatear fecha
  const formatDate = (date: Date, formatStr: string = 'MMMM yyyy') => {
    return format(date, formatStr, { locale: es });
  };

  return {
    CurrentDate: currentDate,
    events,
    monthCalendar,
    navigateMonth,
    goToToday,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getMonthEvents,
    formatDate,
    // Utilities
    isToday: (date: Date) => isToday(date),
    isSameMonth: (date: Date) => isSameMonth(date, currentDate),
    isSameDay: (date1: Date, date2: Date) => isSameDay(date1, date2)
  };
}; 