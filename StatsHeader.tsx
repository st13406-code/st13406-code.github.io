import { motion } from 'motion/react';
import { CreditCard, Package, CheckCircle2 } from 'lucide-react';

interface StatsHeaderProps {
  totalPrice: number;
  assembledCount: number;
  notAssembledCount: number;
  onAddClick: () => void;
}

export default function StatsHeader({ 
  totalPrice, 
  assembledCount, 
  notAssembledCount, 
  onAddClick 
}: StatsHeaderProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-white">
            Collecting
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Gunpla Archive</span>
            <div className="h-px flex-1 bg-zinc-800 w-12" />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-2 font-bold transition-all"
          id="main-add-btn"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Model</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl transition-all hover:border-zinc-700"
        >
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Overall Value</p>
          <p className="text-3xl font-bold text-white flex items-baseline gap-2">
            <span className="text-blue-400 font-mono text-xl">฿</span>
            {totalPrice.toLocaleString()}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center group hover:bg-zinc-900/60 transition-all"
        >
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Assembled</p>
            <p className="text-2xl font-bold text-white">{assembledCount}</p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">
            {assembledCount} Units
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center group hover:bg-zinc-900/60 transition-all"
        >
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Backlog</p>
            <p className="text-2xl font-bold text-white">{notAssembledCount}</p>
          </div>
          <div className="bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full text-sm font-bold border border-amber-500/20">
            {notAssembledCount} Units
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" /><path d="12 5v14" />
    </svg>
  );
}
