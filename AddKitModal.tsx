import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Plus } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { ModelKit, ModelGrade, BuildStatus } from '../types';

interface AddKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kit: Omit<ModelKit, 'id' | 'createdAt'>) => void;
}

export default function AddKitModal({ isOpen, onClose, onSave }: AddKitModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState<ModelGrade>('HG');
  const [status, setStatus] = useState<BuildStatus>('Not Assembled');
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSave({
      name,
      price: parseFloat(price),
      grade,
      status,
      image: image || 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=500&auto=format&fit=crop'
    });
    // Reset and close
    setName('');
    setPrice('');
    setGrade('HG');
    setStatus('Not Assembled');
    setImage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl z-50 p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-light text-white tracking-tight">Add New Kit</h2>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Manual Entry</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                id="close-modal-btn"
              >
                <X className="w-6 h-6 text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors group overflow-hidden"
              >
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="p-3 bg-zinc-700/50 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-zinc-400" />
                    </div>
                    <span className="mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Select Model Photo</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block px-1">Model Identity</label>
                <input
                  id="model-name-input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sazabi Ver.Ka"
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:bg-zinc-800 text-white outline-none transition-all placeholder:text-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block px-1">Price (฿)</label>
                  <input
                    id="model-price-input"
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:bg-zinc-800 text-white outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block px-1">Scale / Grade</label>
                  <select
                    id="model-grade-select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as ModelGrade)}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700 focus:border-blue-500 focus:bg-zinc-800 text-white outline-none transition-all appearance-none"
                  >
                    <option value="HG">HG (Standard)</option>
                    <option value="RG">RG (Detail)</option>
                    <option value="MG">MG (Master)</option>
                    <option value="PG">PG (Perfect)</option>
                    <option value="Non-Grade">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block px-1">Status</label>
                <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-xl border border-zinc-800">
                  {(['Not Assembled', 'Assembled'] as BuildStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        status === s 
                          ? 'bg-zinc-100 text-zinc-950 shadow-lg' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="save-model-btn"
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-6"
              >
                Save Kit to Vault
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
