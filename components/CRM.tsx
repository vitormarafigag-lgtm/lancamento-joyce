import React, { useState } from 'react';
import { Lead } from '../types';
import { Search, Filter, Phone, Star, UserCheck } from 'lucide-react';

interface CRMProps {
  leads: Lead[];
}

export const CRM: React.FC<CRMProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Comprador': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Confirmado': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Aplicou': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">CRM de Lançamento</h2>
            <p className="text-sm text-slate-500">Gerencie os interessados e selecione os 30 participantes.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar por nome..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 pl-4 font-semibold text-slate-500">Nome</th>
                <th className="pb-3 font-semibold text-slate-500">Contato</th>
                <th className="pb-3 font-semibold text-slate-500">Status</th>
                <th className="pb-3 font-semibold text-slate-500">Interesse (1-5)</th>
                <th className="pb-3 font-semibold text-slate-500">Anotações</th>
                <th className="pb-3 font-semibold text-slate-500 text-right pr-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-4 pl-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= lead.interestLevel ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 max-w-xs truncate">{lead.notes}</td>
                  <td className="py-4 text-right pr-4">
                     <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                       Ver Detalhes
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            Nenhum lead encontrado.
          </div>
        )}
      </div>
      
      {/* Selection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
           <div className="flex items-center gap-3 mb-2">
             <UserCheck className="w-5 h-5 text-indigo-600" />
             <h3 className="font-semibold text-indigo-900">Vagas Presenciais</h3>
           </div>
           <p className="text-3xl font-bold text-indigo-700">12<span className="text-lg text-indigo-400 font-normal">/30</span></p>
           <p className="text-sm text-indigo-600 mt-1">Selecionados até agora</p>
        </div>
      </div>
    </div>
  );
};