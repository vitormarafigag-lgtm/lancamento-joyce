import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Sparkles, 
  Menu, 
  X,
  Rocket,
  CalendarDays
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TaskList } from './components/TaskList';
import { CRM } from './components/CRM';
import { AIAssistant } from './components/AIAssistant';
import { Schedule } from './components/Schedule';
import { INITIAL_METRICS, INITIAL_PHASES, INITIAL_TASKS, MOCK_LEADS } from './constants';

enum Tab {
  Dashboard = 'Dashboard',
  Tasks = 'Tarefas',
  Schedule = 'Cronograma',
  CRM = 'CRM / Leads',
  AI = 'Criativo (AI)'
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data passed down
  const metrics = INITIAL_METRICS;
  const phases = INITIAL_PHASES;
  const tasks = INITIAL_TASKS;
  const leads = MOCK_LEADS;

  const NavItem = ({ tab, icon: Icon }: { tab: Tab; icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === tab 
          ? 'bg-indigo-50 text-indigo-700 font-medium' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400'}`} />
      <span>{tab}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">Launch<br/>Command</h1>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem tab={Tab.Dashboard} icon={LayoutDashboard} />
            <NavItem tab={Tab.Tasks} icon={CheckSquare} />
            <NavItem tab={Tab.Schedule} icon={CalendarDays} />
            <NavItem tab={Tab.CRM} icon={Users} />
            <div className="pt-6 mt-6 border-t border-slate-100">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ferramentas</p>
              <NavItem tab={Tab.AI} icon={Sparkles} />
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                EU
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-slate-900 truncate">Admin</p>
                <p className="text-xs text-slate-500 truncate">Project Owner</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 p-4 lg:hidden flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-indigo-600 rounded-md">
                <Rocket className="w-4 h-4 text-white" />
             </div>
             <span className="font-bold text-slate-900">LaunchCommand</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === Tab.Dashboard && <Dashboard metrics={metrics} phases={phases} />}
            {activeTab === Tab.Tasks && <TaskList tasks={tasks} />}
            {activeTab === Tab.Schedule && <Schedule />}
            {activeTab === Tab.CRM && <CRM leads={leads} />}
            {activeTab === Tab.AI && <AIAssistant apiKey={process.env.API_KEY} />}
          </div>
        </div>
      </main>
    </div>
  );
}