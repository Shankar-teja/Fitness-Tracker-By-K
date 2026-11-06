import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { INITIAL_FOOD_PRESETS } from '../../utils/sampleData';
import { Search, Plus, Utensils } from 'lucide-react';

export const QuickFoodModal = ({ isOpen, onClose, onSelectFood }) => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const filtered = INITIAL_FOOD_PRESETS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Healthy Food Presets Library"
      subtitle="Select any item to log instantly to your nutrition journal"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search foods (e.g. Chicken, Oats, Salmon)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1">
            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCat(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterCat === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.map((food, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectFood(food);
                onClose();
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50/50 dark:hover:bg-brand-950/20 border border-slate-100 dark:border-slate-800 hover:border-brand-500/40 cursor-pointer transition-all group"
            >
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                    {food.name}
                  </h5>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                    {food.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>Portion: {food.serving}</span>
                  <span>•</span>
                  <span className="text-emerald-500 font-semibold">{food.protein}g Protein</span>
                  <span>•</span>
                  <span className="text-cyan-500">{food.carbs}g Carbs</span>
                  <span>•</span>
                  <span className="text-amber-500">{food.fat}g Fat</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {food.calories}
                  </span>
                  <span className="text-[10px] block text-slate-400 font-medium">kcal</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-700 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

