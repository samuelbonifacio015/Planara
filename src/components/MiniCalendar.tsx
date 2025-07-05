
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* Componente para el mini calendario */
const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    /* Ajuste para empezar el domingo */
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      
      if (days.length >= 42) break;
    }
    
    return days;
  };

  /* Función para navegar entre meses */
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('prev')}
          className="h-6 w-6 p-0 hover:bg-gray-100"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        
        <span className="text-sm font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('next')}
          className="h-6 w-6 p-0 hover:bg-gray-100"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Dias de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Grilla del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            className={`
              h-6 w-6 text-xs rounded-full transition-colors
              ${isCurrentMonth(day) 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-gray-300'
              }
              ${isToday(day) 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : ''
              }
            `}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
