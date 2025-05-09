'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDatabase, FaExternalLinkAlt } from 'react-icons/fa';

interface ChemBLIntegrationProps {
  targetProtein?: string;
  onDataImport?: (data: any) => void;
}

export default function ChemBLIntegration({ targetProtein, onDataImport }: ChemBLIntegrationProps) {
  const [searchQuery, setSearchQuery] = useState(targetProtein || '');
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = {
      results: [
        { id: 'CHEMBL1234', name: 'Example target data', bioactivities: 128 }
      ]
    };
    
    if (onDataImport) {
      onDataImport(mockData);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
      <h2 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
        <FaDatabase className="mr-2" />
        ChemBL Database Integration
      </h2>
      
      <p className="text-blue-700 mb-4">
        Access additional data from ChemBL database to enrich your hit analysis with bioactivity data, binding profiles, and related compounds.
      </p>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by protein target, molecule name, or ChemBL ID"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className={`px-4 py-2 ${
              isSearching || !searchQuery.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-md transition-colors shadow-sm`}
          >
            {isSearching ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              'Search ChemBL'
            )}
          </button>
        </div>
        
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </button>
        </div>
        
        {showAdvanced && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-md border border-blue-200"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Type
              </label>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Types</option>
                <option value="IC50">IC50</option>
                <option value="EC50">EC50</option>
                <option value="Ki">Ki</option>
                <option value="Kd">Kd</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publication Year
              </label>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Molecular Weight Range
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Source
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="chembl"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="chembl" className="ml-2 block text-sm text-gray-700">
                    ChemBL Database
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="pubchem"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="pubchem" className="ml-2 block text-sm text-gray-700">
                    PubChem
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="drugbank"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="drugbank" className="ml-2 block text-sm text-gray-700">
                    DrugBank
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </form>
      
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors shadow-sm flex items-center">
          <FaDatabase className="mr-2" size={14} />
          Import Structures
        </button>
        <button className="px-4 py-2 bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors shadow-sm">
          Compare Binding Data
        </button>
        <a 
          href="https://www.ebi.ac.uk/chembl/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors shadow-sm flex items-center"
        >
          Visit ChemBL 
          <FaExternalLinkAlt className="ml-2" size={12} />
        </a>
      </div>
    </div>
  );
}
