import React, { useMemo } from 'react';
import { ScheduleEvent } from '../types';
import { Calendar, Instagram, MessageCircle, Megaphone } from 'lucide-react';

export const Schedule: React.FC = () => {
  // Logic to generate the schedule based on user rules
  const events = useMemo(() => {
    const generatedEvents: ScheduleEvent[] = [];
    const currentYear = new Date().getFullYear();

    // 1. Fixed Events
    generatedEvents.push({
      id: 'fix-1',
      date: new Date(currentYear, 0, 30), // Jan 30
      time: '09:00',
      title: 'Mensagem Oficial + Link do Formulário',
      type: 'Strategy'
    });

    generatedEvents.push({
      id: 'fix-2',
      date: new Date(currentYear, 0, 30), // Jan 30
      time: '18:00',
      title: 'Abertura do Grupo WhatsApp',
      type: 'Group'
    });

    // 2. Recurring Events
    // Loop from Feb 02 to March 19
    const startDate = new Date(currentYear, 1, 2); // Feb 02 (Month is 0-indexed, so 1 is Feb)
    const endDate = new Date(currentYear, 2, 19); // March 19

    let loopDate = new Date(startDate);

    while (loopDate <= endDate) {
      const dayOfWeek = loopDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ... 6 = Sat

      // Instagram: Mon (1), Wed (3), Fri (5)
      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        generatedEvents.push({
          id: `insta-${loopDate.getTime()}`,
          date: new Date(loopDate),
          title: 'Post no Instagram (Feed/Reels)',
          type: 'Content'
        });
      }

      // Group Messages: Tue (2), Thu (4)
      // Only verify constraint "until event day" which is handled by loop limit
      if (dayOfWeek === 2 || dayOfWeek === 4) {
        generatedEvents.push({
          id: `group-${loopDate.getTime()}`,
          date: new Date(loopDate),
          title: 'Mensagem de Aquecimento no Grupo',
          type: 'Group'
        });
      }

      // Advance one day
      loopDate.setDate(loopDate.getDate() + 1);
    }

    // Sort by date
    return generatedEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Content': return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'Group': return <MessageCircle className="w-5 h-5 text-green-600" />;
      case 'Strategy': return <Megaphone className="w-5 h-5 text-blue-600" />;
      default: return <Calendar className="w-5 h-5 text-slate-500" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Content': return 'bg-pink-50 border-pink-100';
      case 'Group': return 'bg-green-50 border-green-100';
      case 'Strategy': return 'bg-blue-50 border-blue-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  // Helper to format date header
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      weekday: 'long' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          Cronograma de Ações
        </h2>
        <p className="text-sm text-slate-500">
          Calendário automático de posts e ações no grupo até o lançamento.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
          {events.map((event, index) => {
            const isToday = new Date().toDateString() === event.date.toDateString();
            const isPast = new Date() > event.date;

            return (
              <div key={event.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className={`
                  absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 
                  ${isToday ? 'bg-indigo-600 border-indigo-200 ring-4 ring-indigo-50' : 
                    isPast ? 'bg-slate-300 border-slate-100' : 'bg-white border-indigo-600'}
                `}></div>

                <div className={`
                  rounded-xl p-4 border transition-all hover:shadow-md
                  ${getEventColor(event.type)}
                  ${isPast ? 'opacity-60' : 'opacity-100'}
                `}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                       {formatDate(event.date)}
                       {event.time && <span className="bg-white px-2 py-0.5 rounded shadow-sm text-slate-800">{event.time}</span>}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit
                      ${event.type === 'Content' ? 'bg-pink-100 text-pink-700' : 
                        event.type === 'Group' ? 'bg-green-100 text-green-700' : 
                        'bg-blue-100 text-blue-700'}
                    `}>
                      {event.type === 'Content' ? 'Instagram' : event.type === 'Group' ? 'WhatsApp' : 'Estratégia'}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-white p-2 rounded-lg shadow-sm">
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{event.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {event.type === 'Content' && 'Foco: Consciência e Desejo.'}
                        {event.type === 'Group' && 'Manter engajamento alto.'}
                        {event.type === 'Strategy' && 'Ação crítica de conversão.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-4 bg-indigo-50 rounded-lg text-center text-indigo-700 text-sm font-medium">
          🚀 Dia 19/03: Coquetel de Lançamento (Evento Principal)
        </div>
      </div>
    </div>
  );
};