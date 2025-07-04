import { useState } from 'react';
import { Plus, Bell, Calendar } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarEvent } from '@/types/event';
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
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);

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
        <AppSidebar onCreateEvent={handleCreateEvent} />

        <SidebarInset className="flex-1">
          {/* Barra de navegación */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-soft">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="md:hidden"/>
                <div className="hidden md:block">
                  <SidebarTrigger />
                </div>
              </div>

              {/* Botones de navegación */}
              <Header
                currentDate={CurrentDate}
                onNavigateMonth={navigateMonth}
                onGoToToday={goToToday}
              />
            </div>
          </div>

          {/* Contenido principal */}
          <main className="p-6">
            <div className="animate-fade-in">
              <CalendarGrid
                days={monthCalendar}
                currentDate={CurrentDate}
                getEventsForDate={getEventsByDate}
                onDateClick={handleDateClick}
              />
            </div>

            <EventModal
              isOpen={isEventModalOpen}
              onClose={() => setIsEventModalOpen(false)}
              onSave={handleSaveEvent}
              selectedDate={selectedDate}
              editingEvent={editingEvent}
            />

            {/* Botón flotante para crear evento */}
            <div className="md:hidden">
              <FloatingActionButton onClick={handleCreateEvent} />
            </div>
          </main>

                    {/* Welcome section */}
                    <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  ¡Bienvenido a CalendarX! 📅
                </h2>
                <p className="text-gray-600 mb-4">
                  Tu herramienta de programación de eventos sencilla e intuitiva
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Crear Eventos</h3>
                    <p className="text-sm text-gray-600">Haz clic en cualquier día o usa el botón "+"</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Bell className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Recordatorios</h3>
                    <p className="text-sm text-gray-600">Configura alertas personalizadas</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Vista Mensual</h3>
                    <p className="text-sm text-gray-600">Organiza tu tiempo eficientemente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
};

export default Index;