import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { CheckCircle2, Circle, Clock, Tag, User } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'All' | TaskStatus>('All');

  const handleStatusToggle = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        // Simple cycle: Todo -> InProgress -> Done -> Todo
        const nextStatus = t.status === TaskStatus.Todo ? TaskStatus.InProgress 
          : t.status === TaskStatus.InProgress ? TaskStatus.Done 
          : TaskStatus.Todo;
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Alta': return 'bg-red-100 text-red-700';
      case 'Média': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch(status) {
        case TaskStatus.Done: return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        case TaskStatus.InProgress: return <Clock className="w-5 h-5 text-amber-500" />;
        default: return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-slate-800">Tarefas & Atribuições</h2>
           <p className="text-sm text-slate-500">Gerencie o trabalho da Joyce e High Copy.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['All', TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s === 'All' ? 'Todas' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
             Nenhuma tarefa encontrada neste status.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={`
                group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border transition-all
                ${task.status === TaskStatus.Done ? 'bg-slate-50 border-slate-100 opacity-75' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}
              `}
            >
              <div className="flex items-start gap-4 mb-3 md:mb-0">
                <button onClick={() => handleStatusToggle(task.id)} className="mt-1 flex-shrink-0">
                  {getStatusIcon(task.status)}
                </button>
                <div>
                   <h3 className={`font-medium ${task.status === TaskStatus.Done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                     {task.title}
                   </h3>
                   <div className="flex items-center gap-3 mt-1.5">
                     <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                       {task.priority}
                     </span>
                     <span className="text-xs text-slate-500 flex items-center gap-1">
                       <Tag className="w-3 h-3" /> {task.category}
                     </span>
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pl-9 md:pl-0">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${task.assignee === 'Joyce Brandão' ? 'bg-pink-500' : 'bg-indigo-500'}`}>
                    {task.assignee.charAt(0)}
                  </div>
                  <span className="text-sm text-slate-600">{task.assignee}</span>
                </div>
                
                <div className="md:w-32 text-right">
                   <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                     task.status === TaskStatus.Done ? 'bg-emerald-100 text-emerald-700' :
                     task.status === TaskStatus.InProgress ? 'bg-amber-100 text-amber-700' :
                     'bg-slate-100 text-slate-600'
                   }`}>
                     {task.status}
                   </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};