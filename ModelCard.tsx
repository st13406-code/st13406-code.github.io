import { motion } from 'motion/react';
import { ModelKit } from '../types';

interface ModelCardProps {
  kit: ModelKit;
}

export default function ModelCard({ kit }: ModelCardProps) {
  const gradeColors = {
    'HG': 'bg-blue-100 text-blue-600',
    'RG': 'bg-rose-100 text-rose-600',
    'MG': 'bg-amber-100 text-amber-600',
    'PG': 'bg-purple-100 text-purple-600',
    'Non-Grade': 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <img 
          src={kit.image} 
          alt={kit.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${gradeColors[kit.grade].split(' ')[0].replace('bg-', 'bg-').replace('-100', '-500')}`}>
            {kit.grade}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm text-zinc-100 truncate group-hover:text-white transition-colors" title={kit.name}>
          {kit.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-blue-400 font-bold text-sm">
            <span className="text-[10px] text-zinc-500 mr-0.5 font-mono">฿</span>
            {kit.price.toLocaleString()}
          </p>
          <div className={`w-1.5 h-1.5 rounded-full ${kit.status === 'Assembled' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
        </div>
      </div>
    </div>
  );
}
