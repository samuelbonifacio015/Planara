
import { CalendarEvent } from '@/types/event';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  getEventsForDate: (date: Date) => CalendarEvent[];
  onDateClick: (date: Date) => void;
}

const CalendarGrid = ({ days, currentDate, getEventsForDate, onDateClick }: CalendarGridProps) => {
  const today = new Date();
  const currentMonth = currentDate.getMonth();

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'work':
        return 'bg-primary';
      case 'personal':
        return 'bg-success';
      case 'meeting':
        return 'bg-orange-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Encabezados de días */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {dayNames.map((day) => (
          <div key={day} className="p-4 text-center">
            <span className="text-sm font-medium text-gray-600">{day}</span>
          </div>
        ))}
      </div>

      {/* Cuadrícula del calendario */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth;
          const isToday = day.toDateString() === today.toDateString();
          const dayEvents = getEventsForDate(day);

          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                !isCurrentMonth ? 'bg-gray-25 text-gray-400' : ''
              }`}
              onClick={() => onDateClick(day)}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isToday
                        ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>

                {/* Indicadores de eventos */}
                <div className="flex-1 space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded-full text-white truncate ${getEventColor(event.type)}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayEvents.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
