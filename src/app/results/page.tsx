'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { ScreeningResponse } from '../../services/api';
import LoadingScreen from '../../components/loading/LoadingScreen';
import { findTargetProtein } from '@/services/apiRequests';

const data = [{ "disease_protien": "TP53 (Tumor Protein P53)",
    "protien_id": "1TUP",
    "percentage_contro": 0.68,
    "Associated_pathway": "p53 ras"
  }]

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const disease = searchParams.get('disease') || 'Unknown Disease';
    const [results, setResults] = useState<ScreeningResponse[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const findP = async () => {
            try {
                const res = await findTargetProtein(disease)
                console.log(res.data);
                
                setResults(res.data)
            } catch {

            } finally {
                setIsLoading(false);
            }
        }
        findP();
        
    }, [disease]);

    const getConfidenceColor = (score: number) => {
        if (score >= 0.85) return 'bg-green-100 text-green-800';
        if (score >= 0.7) return 'bg-blue-100 text-blue-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    return (
        <>
            {isLoading ? (<LoadingScreen disease={disease} />)
                : (
                    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8"
                            >
                                <Link href="/target-selection" className="inline-flex items-center text-indigo-700 hover:text-indigo-900 transition-colors">
                                    <FaArrowLeft className="mr-2" />
                                    Back to Target Selection
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white shadow-xl rounded-lg overflow-hidden"
                            >
                                <div className="bg-indigo-700 px-6 py-4">
                                    <h1 className="text-2xl font-bold text-white">
                                        Screening Results for {disease}
                                    </h1>
                                </div>

                                <div className="p-6">
                                    {!results ? (
                                        <div className="flex justify-center items-center h-64">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center mb-6 bg-green-50 p-4 rounded-lg">
                                                <FaCheckCircle className="text-green-500 text-xl mr-3" />
                                                <div>
                                                    <h2 className="font-semibold text-green-800">Screening Complete</h2>
                                                    <p className="text-green-700">{}</p>
                                                </div>
                                            </div>

                                            <div className="mb-8">
                                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                                    Identified Potential Targets
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {results?.map((target) => (<motion.div
                                                        key={target.protien_id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-semibold text-indigo-900">{target.disease_protien}</h3>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(target.percentage_contro)}`}>
                                                                {Math.round(target.percentage_contro * 100)}% Match
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-3">Target ID: {target.protien_id}</p>
                                                        <div className="mb-3">
                                                            <h4 className="text-xs text-gray-500 mb-1">Associated Pathways:</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {target.Associated_pathway.split(" ").map((pathway, index) => (
                                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                                        {pathway}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 pt-3 border-t border-gray-100">
                                                            <Link
                                                                href={`/hit-generation?disease=${encodeURIComponent(disease)}&targetId=${target.protien_id}&targetName=${encodeURIComponent(target.disease_protien)}`}
                                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors"
                                                            >
                                                                Generate Hits
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                                                <FaInfoCircle className="text-blue-500 mr-3 mt-1" />
                                                <div className="text-sm text-blue-700">
                                                    <p className="font-medium mb-1">Next Steps</p>
                                                    <p>These targets have been identified as potentially relevant for {disease} treatment.
                                                        Further molecular docking and in-silico validation is recommended to identify
                                                        drug candidates that could effectively bind to these targets.</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 text-center text-sm text-gray-500"
                            >
                                <p>Powered by AushadhiAI - Advanced Computational Drug Discovery</p>
                                <p className="mt-1">© 2025 AushadhiAI - Revolutionizing drug discovery</p>
                            </motion.div>
                        </div>
                    </div>
                )}
        </>
    );
}