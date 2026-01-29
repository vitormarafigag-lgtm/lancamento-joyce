export enum PhaseStatus {
  Upcoming = 'Upcoming',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Phase {
  id: number;
  name: string;
  dateRange: string;
  description: string;
  status: PhaseStatus;
}

export enum TaskStatus {
  Todo = 'A Fazer',
  InProgress = 'Em Progresso',
  Done = 'Concluído',
}

export interface Task {
  id: string;
  title: string;
  assignee: 'Joyce Brandão' | 'High Copy' | 'Outros';
  status: TaskStatus;
  priority: 'Alta' | 'Média' | 'Baixa';
  category: 'CRM' | 'Conteúdo' | 'Tráfego' | 'Operacional';
}

export interface Metric {
  label: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: 'Interessado' | 'Aplicou' | 'Confirmado' | 'Comprador';
  notes: string;
  interestLevel: number; // 1-5
}

export type EventType = 'Content' | 'Strategy' | 'Group';

export interface ScheduleEvent {
  id: string;
  date: Date;
  title: string;
  type: EventType;
  time?: string;
}