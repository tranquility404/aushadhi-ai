'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

interface TargetSelectionFormProps {
  onSubmit: (disease: string) => void;
  serverError?: string | null;
}

export default function TargetSelectionForm({ onSubmit, serverError }: TargetSelectionFormProps) {
  const [disease, setDisease] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!disease.trim()) {
      setError('Please enter a disease name');
      return;
    }
    
    setError('');
    onSubmit(disease);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
          AushadhiAI Target Selection
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Enter a disease name to start the virtual screening process. Our AI will analyze potential drug targets and compounds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-gray-100"
      >        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="disease" className="block text-sm font-medium text-gray-800 mb-2">
              Disease Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>              <input
                type="text"
                id="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="e.g. Alzheimer's Disease"
                className={`block w-full pl-10 pr-3 py-3 border ${
                  error || serverError ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-900 placeholder:text-gray-400`}
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {serverError && <p className="mt-2 text-sm text-red-600">{serverError}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <span>Start Screening</span>
            <FaArrowRight className="ml-2" />
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {['Diabetes', 'Cancer', 'Hypertension', 'COVID-19'].map((item) => (
              <button
                key={item}
                onClick={() => setDisease(item)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 text-center text-sm text-gray-500"
      >
        <p>Powered by advanced machine learning algorithms</p>
        <p className="mt-1">© 2025 AushadhiAI - Revolutionizing drug discovery</p>
      </motion.div>
    </div>
  );
}
