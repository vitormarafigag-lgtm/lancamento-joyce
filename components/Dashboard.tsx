import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  DollarSign, 
  Calendar, 
  ArrowUpRight,
  Target
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Metric, Phase } from '../types';

interface DashboardProps {
  metrics: Metric[];
  phases: Phase[];
}

const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
  const progress = Math.min(100, (metric.current / metric.target) * 100);
  
  const IconMap: any = {
    Users, FileText, CheckCircle, DollarSign
  };
  const Icon = IconMap[metric.icon];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{metric.current}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${metric.color.replace('text-', 'bg-')}`}>
          <Icon className={`w-6 h-6 ${metric.color}`} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-medium">
          <span>Progresso</span>
          <span>{Math.round(progress)}% de {metric.target}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${metric.color.replace('text-', 'bg-')}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const PhaseTimeline: React.FC<{ phases: Phase[] }> = ({ phases }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
        Cronograma do Lançamento
      </h3>
      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" />
        
        <div className="space-y-8">
          {phases.map((phase, idx) => {
            const isActive = phase.status === 'Active';
            const isDone = phase.status === 'Completed';
            
            return (
              <div key={phase.id} className="relative flex items-start pl-14 group">
                {/* Dot */}
                <div className={`
                  absolute left-4 top-1.5 w-4 h-4 rounded-full border-4 z-10
                  ${isActive ? 'border-indigo-600 bg-white ring-4 ring-indigo-50' : 
                    isDone ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'}
                `} />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-bold ${isActive ? 'text-indigo-600' : isDone ? 'text-slate-700' : 'text-slate-500'}`}>
                      {phase.name}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      {phase.dateRange}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{phase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ metrics, phases }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: March 19, 2024 (Assuming current year or next)
    const targetDate = new Date();
    targetDate.setMonth(2); // March (0-indexed)
    targetDate.setDate(19);
    targetDate.setHours(19, 0, 0, 0); // Event time 19:00
    
    // If date passed in current year, move to next year (basic logic)
    if (new Date() > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  const data = metrics.map(m => ({
    name: m.label,
    value: m.current,
    fill: m.color.includes('green') ? '#16a34a' : 
          m.color.includes('blue') ? '#2563eb' : 
          m.color.includes('purple') ? '#9333ea' : '#ca8a04'
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-indigo-300 font-semibold tracking-wider text-sm uppercase mb-2 block">Status do Lançamento</span>
          <h1 className="text-3xl font-bold mb-2">Fase 2: Consciência</h1>
          <p className="text-slate-300 max-w-xl">
            Foco total em popular o grupo e rodar o formulário de aplicação.
            O coquetel será dia 19/03.
          </p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0 text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <p className="text-indigo-200 text-xs uppercase tracking-widest font-semibold mb-1">Contagem Regressiva</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold font-mono">{timeLeft.days}</span>
            <span className="text-sm">d</span>
            <span className="text-4xl font-bold font-mono ml-2">{timeLeft.hours}</span>
            <span className="text-sm">h</span>
            <span className="text-4xl font-bold font-mono ml-2">{timeLeft.minutes}</span>
            <span className="text-sm">m</span>
            <span className="text-4xl font-bold font-mono ml-2 opacity-75">{timeLeft.seconds}</span>
            <span className="text-sm opacity-75">s</span>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
           <PhaseTimeline phases={phases} />
        </div>

        {/* Quick Stats / Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-600" />
            Distribuição de Leads
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
             {data.map((d, i) => (
               <div key={i} className="flex items-center text-xs">
                 <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: d.fill }}></div>
                 <span className="text-slate-600 font-medium">{d.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};