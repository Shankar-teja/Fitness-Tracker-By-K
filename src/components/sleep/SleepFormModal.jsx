import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { getTodayDateString } from '../../utils/dateUtils';
import { calculateSleepScore } from '../../utils/calculations';

export const SleepFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState(getTodayDateString());
  const [bedtime, setBedtime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:15');
  const [durationHours, setDurationHours] = useState('8.25');
  const [quality, setQuality] = useState('Good');
  const [notes, setNotes] = useState('');

  // Auto calculate duration when bedtime and wakeTime change if feasible
  const handleBedWakeChange = (newBed, newWake) => {
    setBedtime(newBed);
    setWakeTime(newWake);
    try {
      const [bH, bM] = newBed.split(':').map(Number);
      const [wH, wM] = newWake.split(':').map(Number);
      let diffMins = (wH * 60 + wM) - (bH * 60 + bM);
      if (diffMins < 0) diffMins += 24 * 60; // crossed midnight
      const hours = Number((diffMins / 60).toFixed(2));
      if (hours > 0 && hours <= 16) {
        setDurationHours(hours.toString());
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = Number(durationHours) || 8.0;
    const score = calculateSleepScore(duration, quality);

    onSubmit({
      date,
      bedtime,
      wakeTime,
      durationHours: duration,
      quality,
      score,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Sleep Session"
      subtitle="Log your bedtime and recovery metrics"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Date of Wake Up
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bedtime
            </label>
            <input
              type="time"
              required
              value={bedtime}
              onChange={(e) => handleBedWakeChange(e.target.value, wakeTime)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Wake Up Time
            </label>
            <input
              type="time"
              required
              value={wakeTime}
              onChange={(e) => handleBedWakeChange(bedtime, e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Total Duration (Hours)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="24"
              required
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Quality
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
            >
              <option value="Excellent">Excellent (Deep & restful)</option>
              <option value="Good">Good (Normal sleep)</option>
              <option value="Fair">Fair (Interrupted)</option>
              <option value="Poor">Poor (Restless/tired)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notes / Dream Journal
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How refreshed did you feel? Room temp, coffee cutoff, etc."
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg shadow-violet-600/25 transition-all"
          >
            Save Sleep Log
          </button>
        </div>
      </form>
    </Modal>
  );
};

