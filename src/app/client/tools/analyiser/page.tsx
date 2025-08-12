"use client"

import React, { useState, useEffect } from 'react';
import { Clock, HardDrive, TrendingUp, Zap, Code2, Activity } from 'lucide-react';

interface ComplexityMetric {
  type: 'time' | 'space';
  complexity: string;
  value: string;
  description: string;
  color: string;
}

const ComplexityAnalysis: React.FC = () => {
  const [activeComplexity, setActiveComplexity] = useState<string>('O(n²)');
  const [animationPhase, setAnimationPhase] = useState(0);

  const codeSnippet = `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {     // O(n)
    for (let j = 0; j < arr.length - i - 1; j++) { // O(n²)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr; // O(1)
}`;

  const complexityMetrics: ComplexityMetric[] = [
    {
      type: 'time',
      complexity: 'O(n²)',
      value: 'Quadratic',
      description: 'Nested loops create quadratic time complexity',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      type: 'space',
      complexity: 'O(1)',
      value: 'Constant',
      description: 'In-place sorting with constant space usage',
      color: 'from-lime-400 to-green-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Flowing Code Lines */}
        <div className="absolute top-20 left-10 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-20 w-72 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-1000"></div>
        
        {/* Abstract Data Graphs */}
        <svg className="absolute top-16 right-16 w-64 h-48 opacity-30" viewBox="0 0 200 150">
          <path
            d="M20,120 Q60,80 100,100 T180,60"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <path
            d="M20,140 L50,100 L80,120 L120,80 L160,90 L180,70"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="2"
            className="animate-pulse delay-300"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-full">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-wider">
            Complexity
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 font-light">
              Analysis
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Real-time algorithmic complexity detection with precision metrics
          </p>
        </div>

        {/* Main Analysis Card */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-lime-500/20 rounded-2xl blur-xl animate-pulse"></div>
            
            {/* Main Card */}
            <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Code Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-light text-white flex items-center">
                      <Code2 className="w-5 h-5 mr-2 text-cyan-400" />
                      Algorithm Analysis
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-400">Live Analysis</span>
                    </div>
                  </div>
                  
                  <div className="relative bg-slate-900/80 rounded-xl p-6 border border-slate-700/30">
                    <pre className="text-sm md:text-base font-mono text-slate-300 leading-relaxed overflow-x-auto">
                      <code dangerouslySetInnerHTML={{
                        __html: codeSnippet
                          .replace(/\/\/ O\(n²\)/g, '<span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 text-cyan-300 ml-2 animate-pulse">O(n²)</span>')
                          .replace(/\/\/ O\(n\)/g, '<span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 text-purple-300 ml-2">O(n)</span>')
                          .replace(/\/\/ O\(1\)/g, '<span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gradient-to-r from-lime-500/20 to-lime-600/20 border border-lime-500/30 text-lime-300 ml-2">O(1)</span>')
                      }} />
                    </pre>
                    
                    {/* Complexity Highlights */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="w-3 h-3 bg-lime-400 rounded-full animate-ping delay-200"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping delay-400"></div>
                    </div>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-lime-400" />
                    Complexity Metrics
                  </h3>
                  
                  {complexityMetrics.map((metric, index) => (
                    <div
                      key={metric.complexity}
                      className={`relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border transition-all duration-500 ${
                        activeComplexity === metric.complexity 
                          ? 'border-cyan-500/50 shadow-cyan-500/20 shadow-lg' 
                          : 'border-slate-700/30 hover:border-slate-600/50'
                      }`}
                      onMouseEnter={() => setActiveComplexity(metric.complexity)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                            {metric.type === 'time' ? (
                              <Clock className="w-5 h-5 text-cyan-400" />
                            ) : (
                              <HardDrive className="w-5 h-5 text-lime-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-white capitalize">{metric.type} Complexity</h4>
                            <p className="text-sm text-slate-400">{metric.value}</p>
                          </div>
                        </div>
                        <div className={`text-2xl font-mono font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.complexity}
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{metric.description}</p>
                      
                      {/* Animated Progress Bar */}
                      <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ${
                            activeComplexity === metric.complexity ? 'w-full' : 'w-0'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* Performance Impact */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-5">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <h4 className="font-medium text-orange-300">Performance Impact</h4>
                    </div>
                    <p className="text-sm text-orange-200">
                      Quadratic complexity may cause performance issues with large datasets (n {'>'} 1000)
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-3/4 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-orange-300 font-mono">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Functions Analyzed', value: '1,247', icon: Code2 },
            { label: 'Avg Complexity', value: 'O(n log n)', icon: TrendingUp },
            { label: 'Optimizations', value: '23', icon: Zap },
            { label: 'Performance Gain', value: '+340%', icon: Activity }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/20">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-mono font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ComplexityAnalysis;