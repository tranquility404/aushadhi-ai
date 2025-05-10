'use client';

import { findHits } from '@/services/apiRequests';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaChartBar } from 'react-icons/fa';
import IC50Chart from '../../components/charts/IC50Chart';

interface MolecularHit {
  molecule: string;
  molecule_name: string;
  ic50: number;
  disease_name: string;
  disease_pid: string,
  disease_protien_name: string;
}

export default function HitGenerationPage() {
  const searchParams = useSearchParams();
  const disease = searchParams.get('disease') || '';
  const targetId = searchParams.get('targetId') || '';
  const targetName = searchParams.get('targetName') || 'Unknown Target';
  
  const [loading, setLoading] = useState(true);
  const [hits, setHits] = useState<MolecularHit[]>([]);
  const [sortedHits, setSortedHits] = useState<MolecularHit[]>([]);
  const [sortBy, setSortBy] = useState<'ic50' | 'name'>('ic50');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  useEffect(() => {
    const fetchMolecules = async () => {
      setLoading(true);
      try {
        const res = await findHits(disease);
        setHits(res.data);
      } finally {
        setLoading(false)
      }
      
    };
    
    fetchMolecules();  }, [targetName]);

  useEffect(() => {
    const sortHits = () => {
      const sorted = [...hits].sort((a, b) => {
        if (sortBy === 'ic50') {
          return sortOrder === 'asc' ? a.ic50 - b.ic50 : b.ic50 - a.ic50;
        } else {
          return sortOrder === 'asc' 
            ? a.disease_protien_name.localeCompare(b.disease_protien_name)
            : b.disease_protien_name.localeCompare(a.disease_protien_name);
        }
      });
      setSortedHits(sorted);
    };
    
    sortHits();
  }, [hits, sortBy, sortOrder]);

  const handleSortChange = (field: 'ic50' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <Link href={`/results?disease=${encodeURIComponent(disease)}`} className="inline-flex items-center text-yellow-700 hover:text-yellow-900 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Target Selection Results
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-yellow-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Hit Generation for {targetName}
            </h1>
            {disease && (
              <p className="text-yellow-50">Disease: {disease}</p>
            )}
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                  <p className="text-yellow-700">Fetching molecular structures...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Sorting controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                    Molecular Hits ({sortedHits.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <button 
                      onClick={() => handleSortChange('ic50')}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${
                        sortBy === 'ic50' 
                          ? 'bg-yellow-100 text-yellow-800 font-medium' 
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
                          ? 'bg-yellow-100 text-yellow-800 font-medium' 
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
                >                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FaChartBar className="mr-2 text-yellow-600" />
                      IC50 Values Comparison
                    </h3>
                    <div className="h-52 w-full overflow-hidden">
                      <IC50Chart molecules={sortedHits} title="" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Lower IC50 values indicate stronger binding affinity to the target protein
                    </div>
                  </div>
                </motion.div>

                {/* List of molecular hits */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedHits.map((hit) => (
                    <motion.div
                      key={hit.disease_pid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 flex flex-col md:flex-row">
                        <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
                          {/* Molecular structure image */}
                          <img 
                            src={hit.molecule} 
                            alt={`Structure of ${hit.disease_name}`}
                            className="h-40 w-40 object-contain bg-white rounded-lg border border-gray-200"
                          />
                        </div>
                        <div className="md:w-2/3 md:pl-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800 mr-4" style={{textOverflow: "ellipses", overflow: "hidden", whiteSpace: "nowrap"}}>{hit.molecule_name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full w-70 ${
                              hit.ic50 < 1 
                              ? 'bg-green-100 text-green-800' 
                              : hit.ic50 < 5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                              }`}>
                              IC50: {hit.ic50.toFixed(2)} nM
                            </span>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">

                              <p className="text-sm font-mono mt-1 text-gray-500 " >{hit.molecule}</p>
                            <div className="col-span-2">
                              <span className="text-gray-500">Target Protein:</span>
                              <span className="ml-1 font-medium text-gray-700">{hit.disease_protien_name}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">                            
                            <Link
                              href={`/evaluation-results?disease=${encodeURIComponent(disease)}&compound=${encodeURIComponent(hit.molecule)}`}
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
