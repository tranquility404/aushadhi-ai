'use client';

import { generateAlternateMols } from '@/services/apiRequests';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaChartBar } from 'react-icons/fa';
import IC50Chart from '../../components/charts/IC50Chart';

interface AlternateStructure {
  molecule: string;
  molecule_name: string;
  smile_string: string;
  ic50: number;
  disease_name: string;
  disease_pid: string;
  disease_protien_name: string;
  molecule_image: string;
}

export default function AlternateStructuresPage() {
  const searchParams = useSearchParams();
  const disease = searchParams.get('disease') || 'Unknown Disease';
  const molecule_name = searchParams.get('molecule_name') || '';
  const parentCompound = searchParams.get('parentCompound') || 'Selected Compound';
  const targetName = searchParams.get('targetName') || 'Unknown Target';
  
  const [loading, setLoading] = useState(true);
  const [alternateStructures, setAlternateStructures] = useState<AlternateStructure[]>([]);
  const [sortedStructures, setSortedStructures] = useState<AlternateStructure[]>([]);
  const [sortBy, setSortBy] = useState<'ic50' | 'name'>('ic50');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchAlternateStructures = async () => {
      setLoading(true);
      try {
        // Use the mock API service to fetch data
        const res = await generateAlternateMols(disease);
        setAlternateStructures(res.data);
      } catch (error) {
        console.error('Error fetching alternate structures:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlternateStructures();
  }, [molecule_name, disease, targetName]);

  useEffect(() => {
    const sortStructures = () => {
      const sorted = [...alternateStructures].sort((a, b) => {
        if (sortBy === 'ic50') {
          return sortOrder === 'asc' ? a.ic50 - b.ic50 : b.ic50 - a.ic50;
        } else {
          return sortOrder === 'asc' 
            ? a.molecule_name.localeCompare(b.molecule_name)
            : b.molecule_name.localeCompare(a.molecule_name);
        }
      });
      setSortedStructures(sorted);
    };
    
    sortStructures();
  }, [alternateStructures, sortBy, sortOrder]);

  const handleSortChange = (field: 'ic50' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <Link 
            href={`/hit-generation?disease=${encodeURIComponent(disease)}&targetName=${encodeURIComponent(targetName)}`} 
            className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Hit Generation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Alternative Structures for {parentCompound}
            </h1>
            {disease && (
              <p className="text-blue-50">Disease: {disease}</p>
            )}
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-blue-700">Fetching alternate molecular structures...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Sorting controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                    Alternative Structures ({sortedStructures.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <button 
                      onClick={() => handleSortChange('ic50')}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${
                        sortBy === 'ic50' 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      IC50 Value
                      {sortBy === 'ic50' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                    <button 
                      onClick={() => handleSortChange('name')}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${
                        sortBy === 'name' 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Name
                      {sortBy === 'name' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* IC50 Chart */}                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FaChartBar className="mr-2 text-blue-600" />
                      IC50 Values Comparison
                    </h3>
                    <div className="h-52 w-full overflow-hidden">
                      <IC50Chart molecules={sortedStructures} title="IC50 Values for Alternate Structures" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Lower IC50 values indicate stronger binding affinity to the target protein
                    </div>
                  </div>
                </motion.div>

                {/* List of alternate structures */}
                <div className="grid grid-cols-1 gap-6">
                  {sortedStructures.map((structure) => (
                    <motion.div
                      key={structure.disease_pid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 flex flex-col md:flex-row">
                        <div className="md:w-1/4 flex justify-center items-start mb-4 md:mb-0">
                          {/* Molecular structure image */}
                          <img 
                            src={`data:image/png;base64,${structure.molecule_image}`} 
                            alt={`Structure of ${structure.molecule_name}`}
                            className="h-48 w-48 object-contain bg-white rounded-lg border border-gray-200"
                          />
                        </div>
                        <div className="md:w-3/4 md:pl-6">
                          <div className="flex justify-between items-start flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-800 mr-4 mb-2">
                              {structure.molecule_name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              structure.ic50 < 1 
                              ? 'bg-green-100 text-green-800' 
                              : structure.ic50 < 5 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-red-100 text-red-800'
                              }`}>
                              IC50: {structure.ic50.toFixed(2)} nM
                            </span>
                          </div>
                          
                          <div className="mt-3 space-y-3">
                            <div>
                              <span className="text-gray-500 text-sm">SMILE String:</span>
                              <div className="mt-1 bg-gray-50 p-2 rounded-md border border-gray-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all text-gray-600">
                                {structure.molecule}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-gray-500 text-sm">Target Protein:</span>
                              <span className="ml-1 font-medium text-gray-700">{structure.disease_protien_name}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">                            
                            <Link
                              href={`/evaluation-results?disease=${encodeURIComponent(disease)}&compound=${encodeURIComponent(structure.molecule)}&molecule_name=${encodeURIComponent(structure.molecule_name)}`}
                              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                            >
                              View Evaluation
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>AushadhiAI - Powered by advanced molecular modeling</p>
          <p className="mt-1">© 2025 AushadhiAI - Revolutionizing drug discovery</p>
        </motion.div>
      </div>
    </div>
  );
}