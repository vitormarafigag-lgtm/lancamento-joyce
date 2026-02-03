import { Phase, PhaseStatus, Task, TaskStatus, Metric, Lead } from './types';

export const INITIAL_PHASES: Phase[] = [
  {
    id: 1,
    name: 'Fase 1: Antecipação',
    dateRange: 'Jan - Fev',
    description: 'Aquecimento do público e preparação.',
    status: PhaseStatus.Completed,
  },
  {
    id: 2,
    name: 'Fase 2: Consciência',
    dateRange: '01/02 - 19/03',
    description: 'Educação, grupos de WhatsApp e formulário de aplicação.',
    status: PhaseStatus.Active,
  },
  {
    id: 3,
    name: 'Fase 3: Conversão',
    dateRange: '19/03',
    description: 'Coquetel de lançamento presencial (SP) e vendas.',
    status: PhaseStatus.Upcoming,
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Listar todas as pessoas e interesse (CRM)',
    assignee: 'Joyce Brandão',
    status: TaskStatus.Todo,
    priority: 'Alta',
    category: 'CRM',
  },
  {
    id: '2',
    title: 'Contato 1:1 para taxa de reserva',
    assignee: 'Joyce Brandão',
    status: TaskStatus.InProgress,
    priority: 'Alta',
    category: 'CRM',
  },
  {
    id: '3',
    title: 'Criar copy da mensagem com data + link',
    assignee: 'High Copy',
    status: TaskStatus.Done,
    priority: 'Alta',
    category: 'Conteúdo',
  },
  {
    id: '4',
    title: 'Criar o formulário de aplicação',
    assignee: 'Joyce Brandão',
    status: TaskStatus.Done,
    priority: 'Média',
    category: 'Operacional',
  },
  {
    id: '5',
    title: 'Criar novos conteúdos para Instagram',
    assignee: 'High Copy',
    status: TaskStatus.InProgress,
    priority: 'Média',
    category: 'Conteúdo',
  },
  {
    id: '6',
    title: 'Criar 3 sequências de stories',
    assignee: 'High Copy',
    status: TaskStatus.Todo,
    priority: 'Média',
    category: 'Conteúdo',
  },
  {
    id: '7',
    title: 'Criar 10 anúncios (5 vídeo, 5 estáticos)',
    assignee: 'High Copy',
    status: TaskStatus.Todo,
    priority: 'Alta',
    category: 'Tráfego',
  },
];

export const INITIAL_METRICS: Metric[] = [
  {
    label: 'Grupo WhatsApp',
    current: 206,
    target: 500,
    unit: 'membros',
    icon: 'Users',
    color: 'text-green-600',
  },
  {
    label: 'Aplicações',
    current: 62,
    target: 80,
    unit: 'forms',
    icon: 'FileText',
    color: 'text-blue-600',
  },
  {
    label: 'Confirmados (Evento)',
    current: 15,
    target: 60,
    unit: 'pessoas',
    icon: 'CheckCircle',
    color: 'text-purple-600',
  },
  {
    label: 'Compradores',
    current: 0,
    target: 10,
    unit: 'vendas',
    icon: 'DollarSign',
    color: 'text-yellow-600',
  },
];

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Fernanda Silva', phone: '11 99999-9999', status: 'Confirmado', notes: 'Comprou passagem', interestLevel: 5 },
  { id: '2', name: 'Roberto Almeida', phone: '21 98888-8888', status: 'Aplicou', notes: 'Aguardando seleção', interestLevel: 4 },
  { id: '3', name: 'Juliana Costa', phone: '11 97777-7777', status: 'Interessado', notes: 'Pediu mais infos no direct', interestLevel: 3 },
  { id: '4', name: 'Marcos Pereira', phone: '31 96666-6666', status: 'Comprador', notes: 'Pagou taxa de reserva', interestLevel: 5 },
];