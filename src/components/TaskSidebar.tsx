import { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Star, 
  List,
  Check,
  Calendar,
  Clock,
  AlertCircle,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTasks } from '@/hooks/useTasks';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';

interface TaskSidebarProps {
  onCreateTask: () => void;
}

const TaskSidebar = ({ onCreateTask }: TaskSidebarProps) => {
  const { state } = useSidebar();
  const { filter, setFilter, stats } = useTasks();
  
  const taskLists = [
    { 
      id: 'all', 
      name: 'Todas las tareas', 
      icon: List, 
      count: stats.total,
      color: '#6B7280'
    },
    { 
      id: 'starred', 
      name: 'Destacadas', 
      icon: Star, 
      count: stats.starred,
      color: '#F59E0B'
    },
    { 
      id: 'pending', 
      name: 'Pendientes', 
      icon: Clock, 
      count: stats.pending,
      color: '#3B82F6'
    },
    { 
      id: 'completed', 
      name: 'Completadas', 
      icon: Check, 
      count: stats.completed,
      color: '#10B981'
    }
  ];

  const myLists = [
    { 
      id: 'personal', 
      name: 'Mis tareas', 
      color: '#3B82F6', 
      count: stats.total,
      isChecked: true
    }
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <CheckSquare className="h-4 w-4 text-primary" />
          </div>
          {state === 'expanded' && (
            <div>
              <span className="text-lg font-semibold text-gray-900">Tareas</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Botón Crear Tarea */}
        <div>
          <Button 
            onClick={onCreateTask}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm transition-all duration-200 font-medium"
            size={state === 'expanded' ? 'default' : 'icon'}
          >
            <Plus className="h-4 w-4" />
            {state === 'expanded' && <span className="ml-2">Crear tarea</span>}
          </Button>
        </div>

        {/* Búsqueda */}
        {state === 'expanded' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar tareas"
              className="pl-10 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50 text-sm"
            />
          </div>
        )}

        {/* Filtros principales */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {taskLists.map((list) => {
                const Icon = list.icon;
                const isActive = filter === list.id;
                
                return (
                  <SidebarMenuItem key={list.id}>
                    <SidebarMenuButton 
                      onClick={() => setFilter(list.id as any)}
                      className={`w-full justify-between hover:bg-gray-50 rounded-lg transition-colors py-2 px-3 ${
                        isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" style={{ color: isActive ? '#3B82F6' : list.color }} />
                        {state === 'expanded' && (
                          <span className="text-sm font-medium">{list.name}</span>
                        )}
                      </div>
                      {state === 'expanded' && list.count > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {list.count}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Listas personalizadas */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between text-gray-600 font-medium text-xs uppercase tracking-wider px-3">
            <span>{state === 'expanded' ? 'Listas' : 'L'}</span>
            {state === 'expanded' && (
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-gray-100 rounded">
                <Plus className="h-3 w-3 text-gray-500" />
              </Button>
            )}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {myLists.map((list) => (
                <SidebarMenuItem key={list.id}>
                  <SidebarMenuButton 
                    className="w-full justify-between hover:bg-gray-50 rounded-lg transition-colors py-2 px-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={list.isChecked}
                          onChange={() => {}}
                          aria-label={`Mostrar ${list.name}`}
                          className="w-3 h-3 rounded border-gray-300 text-primary focus:ring-primary/20"
                        />
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: list.color }}
                      />
                      {state === 'expanded' && (
                        <span className="text-sm text-gray-700">{list.name}</span>
                      )}
                    </div>
                    {state === 'expanded' && list.count > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {list.count}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Crear nueva lista */}
        {state === 'expanded' && (
          <div className="pt-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg py-2 px-3 text-sm"
            >
              <Plus className="h-4 w-4 mr-3" />
              Crear lista
            </Button>
          </div>
        )}

        {/* Estadísticas rápidas */}
        {state === 'expanded' && stats.overdue > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3">
            <div className="flex items-start space-x-2 text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Tareas vencidas</p>
                <p className="text-xs text-red-600">{stats.overdue} tareas necesitan atención</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default TaskSidebar; 