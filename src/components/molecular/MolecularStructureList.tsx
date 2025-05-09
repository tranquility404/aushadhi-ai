'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExpand, FaInfo } from 'react-icons/fa';

interface Molecule {
  id: string;
  name: string;
  formula: string;
  ic50Value: number;
  structure: string;
  source: string;
  mechanism: string;
  targetProtein: string;
}

interface MolecularStructureListProps {
  molecules: Molecule[];
  onSelect?: (moleculeId: string) => void;
}

export default function MolecularStructureList({ molecules, onSelect }: MolecularStructureListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {molecules.map((molecule, index) => (
        <motion.div
          key={molecule.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-4 flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
              <div className="relative group">
                <img 
                  src={molecule.structure} 
                  alt={`Structure of ${molecule.name}`}
                  className="h-40 w-40 object-contain bg-white rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <button 
                    className="p-2 bg-white rounded-full m-1 hover:bg-gray-100" 
                    title="Expand structure"
                  >
                    <FaExpand className="text-gray-700" size={14} />
                  </button>
                  <button 
                    className="p-2 bg-white rounded-full m-1 hover:bg-gray-100" 
                    title="Download structure"
                  >
                    <FaDownload className="text-gray-700" size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{molecule.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  molecule.ic50Value < 1 
                    ? 'bg-green-100 text-green-800' 
                    : molecule.ic50Value < 5 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  IC50: {molecule.ic50Value} nM
                </span>
              </div>
              
              <p className="text-sm font-mono mt-1 text-gray-500">{molecule.formula}</p>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Source:</span>
                  <span className="ml-1 font-medium text-gray-700">{molecule.source}</span>
                </div>
                <div>
                  <span className="text-gray-500">Mechanism:</span>
                  <span className="ml-1 font-medium text-gray-700">{molecule.mechanism}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Target Protein:</span>
                  <span className="ml-1 font-medium text-gray-700">{molecule.targetProtein}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => onSelect && onSelect(molecule.id)}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors flex items-center"
                >
                  <FaInfo className="mr-1" size={10} />
                  View Details
                </button>
                <button className="text-xs px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full hover:bg-yellow-100 transition-colors">
                  ChemBL Data
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
