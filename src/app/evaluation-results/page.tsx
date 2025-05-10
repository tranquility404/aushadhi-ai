'use client';

import { showEvaluation } from '@/services/apiRequests';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaChartBar, FaExclamationTriangle, FaCheckCircle, FaDollarSign, FaCube } from 'react-icons/fa';


interface MolecularSideEffect {
  molecule: string;
  molecule_name: string;
  ic50: number;
  disease_name: string;
  disease_pid: string,
  disease_protien_name: string;
  data_analysis_report: string;
}

export default function EvaluationResultsPage() {
  const searchParams = useSearchParams();
  const disease = searchParams.get('disease') || 'Unknown Disease';
  const molecule_name = searchParams.get('molecule_name') || 'Unknown Molecule'
  const compound = searchParams.get('compound') || 'Selected Compound';
  const targetName = searchParams.get('target')
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [sideEffect, setSideEffect] = useState<MolecularSideEffect[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

    useEffect(() => {
      const fetchMolecules = async () => {
        setLoading(true);
        try {
          const res = await showEvaluation(molecule_name);
          setSideEffect(res.data);
        } finally {
          setLoading(false)
        }
      };
      fetchMolecules();  }, [targetName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/hit-generation" className="inline-flex items-center text-indigo-700 hover:text-indigo-900 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Hit Generation
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white px-6 py-4 shadow-sm rounded-t-lg">
            <h1 className="text-2xl font-bold text-gray-900">
              Evaluation Results for {compound}
            </h1>
            <p className="text-gray-600">Disease target: {disease}</p>
          </div>
          
          <div className="bg-white shadow-sm mb-8 p-2 border-t border-gray-100">
            <div className="flex space-x-4">
              <button 
                onClick={() => handleTabChange('overview')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'overview' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => handleTabChange('detailed')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'detailed' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Detailed Analysis
              </button>
              <button 
                onClick={() => handleTabChange('comparison')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'comparison' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Comparative Results
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout for Evaluation Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Side Effects Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1"
          >
            <div className="bg-pink-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-pink-800 mr-2" />
                <h2 className="font-semibold text-pink-900">Side Effects</h2>
              </div>
              <span className="bg-white text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
                Moderate Risk
              </span>
            </div>
            {/* <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Mild nausea (18% occurrence)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Headache (15% occurrence)</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">No cardiac anomalies detected</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">No hepatotoxicity detected</span>
                </div> */}
                {/* <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Based on in-silico ADMET prediction models and structural similarity analysis
                  </div>
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Effectiveness Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1"
          >
            <div className="bg-green-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-800 mr-2" />
                <h2 className="font-semibold text-green-900">Effectiveness</h2>
              </div>
              <span className="bg-white text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                High Efficacy
              </span>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Binding Affinity</span>
                  <span className="text-xs font-medium text-gray-700">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Target Selectivity</span>
                  <span className="text-xs font-medium text-gray-700">86%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Predicted IC50</span>
                  <span className="text-xs font-medium text-gray-700">0.32 nM</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-semibold text-gray-700">Excellent Potency</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Results based on molecular docking, dynamics simulation, and ML prediction models
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cost Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1"
          >
            <div className="bg-yellow-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaDollarSign className="text-yellow-800 mr-2" />
                <h2 className="font-semibold text-yellow-900">Cost Analysis</h2>
              </div>
              <span className="bg-white text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                Moderate
              </span>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Synthesis Complexity:</span>
                  <span className="text-sm font-medium text-gray-900">Medium (4 steps)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Raw Materials Cost:</span>
                  <span className="text-sm font-medium text-gray-900">$215/gram</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Estimated Scale-up Cost:</span>
                  <span className="text-sm font-medium text-gray-900">$65/gram</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Cost Efficiency Ranking:</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">7.4/10</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="h-2 w-2 rounded-full bg-yellow-500 mr-0.5"></div>
                      ))}
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-2 w-2 rounded-full bg-gray-300 mr-0.5"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Based on retrosynthetic analysis and current market prices of precursors
                </div>
              </div>
            </div>
          </motion.div>

          {/* Molecular Simulation Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1 md:col-span-2"
          >
            <div className="bg-orange-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaCube className="text-orange-800 mr-2" />
                <h2 className="font-semibold text-orange-900">Molecular Simulation Output</h2>
              </div>
              <span className="bg-white text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                200ns Simulation
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Key Interactions</h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Hydrogen bond with Ser152 (89% persistence)</li>
                    <li>• π-π stacking with Phe209 (76% persistence)</li>
                    <li>• Salt bridge with Arg348 (62% persistence)</li>
                    <li>• Hydrophobic contact with Leu95 (94% persistence)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Conformational Analysis</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>• RMSD from initial pose: 1.4 ± 0.3 Å</p>
                    <p>• Average binding energy: -9.8 kcal/mol</p>
                    <p>• Residence time estimate: 42 minutes</p>
                    <p>• Stable binding mode observed after 25ns</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Molecular dynamics visualization would appear here</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Structure Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1 lg:col-span-1"
          >
            <div className="bg-purple-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <FaChartBar className="text-purple-800 mr-2" />
                <h2 className="font-semibold text-purple-900">Structure Analysis</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <div className="flex flex-col md:flex-row md:items-center mb-2">
                  <div className="bg-gray-100 h-24 w-24 rounded flex items-center justify-center mb-2 md:mb-0 md:mr-3">
                    <span className="text-xs text-gray-500">Structure</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Structure Properties</h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                      <div className="text-xs text-gray-600">Mol. Weight: <span className="text-gray-800">387.4 Da</span></div>
                      <div className="text-xs text-gray-600">LogP: <span className="text-gray-800">3.2</span></div>
                      <div className="text-xs text-gray-600">H-Donors: <span className="text-gray-800">2</span></div>
                      <div className="text-xs text-gray-600">H-Acceptors: <span className="text-gray-800">5</span></div>
                      <div className="text-xs text-gray-600">Rot. Bonds: <span className="text-gray-800">4</span></div>
                      <div className="text-xs text-gray-600">TPSA: <span className="text-gray-800">78.5 Å²</span></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <span className="font-medium text-gray-700">Lipinski's Rule of 5:</span> Passes all criteria
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <span className="font-medium text-gray-700">Structure Alerts:</span> No structural alerts detected
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comparative Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden col-span-1 md:col-span-3"
          >
            <div className="bg-blue-100 px-4 py-2 flex items-center">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="font-semibold text-blue-900">Comparative Analysis</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{compound} (Current)</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compound B</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compound C</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best in class</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 text-sm text-gray-900">IC50</td>
                      <td className="py-2 text-sm text-gray-900 font-medium">0.32 nM</td>
                      <td className="py-2 text-sm text-gray-600">1.45 nM</td>
                      <td className="py-2 text-sm text-gray-600">0.89 nM</td>
                      <td className="py-2 text-sm text-gray-600">0.15 nM</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-900">Selectivity</td>
                      <td className="py-2 text-sm text-gray-900 font-medium">86%</td>
                      <td className="py-2 text-sm text-gray-600">74%</td>
                      <td className="py-2 text-sm text-gray-600">82%</td>
                      <td className="py-2 text-sm text-gray-600">91%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-900">Side Effects</td>
                      <td className="py-2 text-sm text-gray-900 font-medium">Moderate</td>
                      <td className="py-2 text-sm text-gray-600">Low</td>
                      <td className="py-2 text-sm text-gray-600">High</td>
                      <td className="py-2 text-sm text-gray-600">Low</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-sm text-gray-900">Cost Efficiency</td>
                      <td className="py-2 text-sm text-gray-900 font-medium">7.4/10</td>
                      <td className="py-2 text-sm text-gray-600">6.2/10</td>
                      <td className="py-2 text-sm text-gray-600">5.8/10</td>
                      <td className="py-2 text-sm text-gray-600">8.9/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-blue-50 rounded-md p-3">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Summary Analysis</h3>
                <p className="text-xs text-blue-800">
                  {compound} demonstrates excellent potency (0.32 nM) and good selectivity (86%), placing it as a strong candidate in the series. 
                  While it has moderate side effect risk, this is balanced by a favorable cost efficiency profile compared to alternatives.
                  Overall, it ranks 2nd out of 12 evaluated compounds in this screening series.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendation</h2>
          <p className="text-gray-700 mb-4">
            Based on the comprehensive evaluation of all metrics, {compound} is recommended for advancement to preclinical studies.
            Its excellent binding affinity and favorable structural properties make it a promising candidate for further development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="border border-green-200 rounded-md p-3 bg-green-50">
              <h3 className="text-sm font-medium text-green-800 mb-1">Strengths</h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• High binding affinity (0.32 nM IC50)</li>
                <li>• Good target selectivity (86%)</li>
                <li>• No major toxicity flags</li>
                <li>• Favorable pharmacokinetic properties</li>
              </ul>
            </div>
            
            <div className="border border-yellow-200 rounded-md p-3 bg-yellow-50">
              <h3 className="text-sm font-medium text-yellow-800 mb-1">Considerations</h3>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Moderate risk of mild side effects</li>
                <li>• Medium synthesis complexity (4 steps)</li>
                <li>• Room for optimization of residence time</li>
              </ul>
            </div>
            
            <div className="border border-blue-200 rounded-md p-3 bg-blue-50">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Next Steps</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Conduct in vitro ADMET studies</li>
                <li>• Optimize synthetic route for scale-up</li>
                <li>• Explore minor structural modifications to reduce side effect risk</li>
                <li>• Begin preliminary formulation studies</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
              Export Full Report
            </button>
            <button className="px-4 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors shadow-sm">
              Schedule Review Meeting
            </button>
            <button className="px-4 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors shadow-sm">
              Advance to Preclinical
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-gray-500 mb-10"
        >
          <p>AushadhiAI - Advanced Computational Drug Discovery</p>
          <p className="mt-1">© 2025 AushadhiAI - Revolutionizing drug discovery through AI</p>
        </motion.div>
      </div>
    </div>
  );
}
