'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaDna, FaMicroscope, FaAtom } from 'react-icons/fa';

interface LoadingScreenProps {
  disease: string;
}

export default function LoadingScreen({ disease }: LoadingScreenProps) {
  const analysisPhrases = [
    'Analyzing molecular structures...',
    'Identifying potential targets...',
    'Running computational simulations...',
    'Applying machine learning models...',
    'Evaluating binding affinities...',
    'Processing disease pathways...',
  ];

  const iconComponents = [FaFlask, FaDna, FaMicroscope, FaAtom];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
          Virtual Screening in Progress
        </h1>
        <p className="text-lg text-gray-600">
          Analyzing targets for <span className="font-semibold">{disease}</span>
        </p>
      </motion.div>

      {/* Animated molecules visualization */}
      <div className="relative w-64 h-64 mb-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Outer circle of molecules */}
            {[...Array(8)].map((_, i) => {
              const Icon = iconComponents[i % iconComponents.length];
              return (
                <motion.div
                  key={`outer-${i}`}
                  className="absolute"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${32 - Math.sin(i * (Math.PI / 4)) * 28}%`,
                    top: `${32 - Math.cos(i * (Math.PI / 4)) * 28}%`,
                  }}
                >
                  <Icon className="text-indigo-600" size={16} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-3/4 h-3/4 flex items-center justify-center"
          >
            {/* Middle circle of molecules */}
            {[...Array(6)].map((_, i) => {
              const Icon = iconComponents[(i + 2) % iconComponents.length];
              return (
                <motion.div
                  key={`middle-${i}`}
                  className="absolute"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  style={{
                    left: `${50 - Math.sin(i * (Math.PI / 3)) * 25}%`,
                    top: `${50 - Math.cos(i * (Math.PI / 3)) * 25}%`,
                  }}
                >
                  <Icon className="text-purple-500" size={20} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Center structure */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-4 shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaDna className="text-indigo-800" size={32} />
        </motion.div>

        {/* Connecting lines effect */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgba(129, 140, 248, 0.2)"
            strokeWidth="1"
            fill="none"
            animate={{ r: ['40%', '45%', '40%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="30%"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
            fill="none"
            animate={{ r: ['25%', '30%', '25%'] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Analysis text */}
      <div className="h-8 text-center mb-8">
        {analysisPhrases.map((phrase, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: index === (Math.floor(Date.now() / 3000) % analysisPhrases.length) ? 1 : 0,
              y: index === (Math.floor(Date.now() / 3000) % analysisPhrases.length) ? 0 : 10
            }}
            transition={{ duration: 0.5 }}
            className="text-indigo-600 font-medium absolute left-0 right-0"
          >
            {phrase}
          </motion.p>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
      
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-gray-500 mt-2"
      >
        This may take a few moments...
      </motion.p>
    </div>
  );
}
