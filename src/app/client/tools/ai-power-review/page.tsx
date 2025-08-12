"use client"

import React, { useState } from 'react';
import { Brain, Code, Target, Zap, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface ReviewSuggestion {
  id: string;
  type: 'performance' | 'security' | 'maintainability' | 'best-practice';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  lineNumber?: number;
}

interface AIReviewProps {
  className?: string;
}

const AIReview: React.FC<AIReviewProps> = ({ className = '' }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [codeInput, setCodeInput] = useState(`function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  }`);
  
  const mockSuggestions: ReviewSuggestion[] = [
    {
      id: '1',
      type: 'best-practice',
      title: 'Use modern array methods',
      description: 'Consider using reduce() for cleaner, more functional code',
      severity: 'medium',
      lineNumber: 3
    },
    {
      id: '2',
      type: 'maintainability',
      title: 'Add input validation',
      description: 'Validate that items array exists and contains valid objects',
      severity: 'high',
      lineNumber: 1
    },
    {
      id: '3',
      type: 'performance',
      title: 'Consider memoization',
      description: 'For large datasets, consider caching results',
      severity: 'low'
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsAnalyzing(false);
    setShowResults(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'security': return <CheckCircle className="w-4 h-4" />;
      case 'maintainability': return <Code className="w-4 h-4" />;
      case 'best-practice': return <Target className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className={`mt-20 mx-auto p-6 h-screen w-full bg-gradient-to-r from-gray-900 to-black text-blue-400 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
        </div>
        <h1 className="text-3xl font-bold text-blue-500 mb-2">
          AI-Powered Review
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Context-aware analysis using advanced LLM APIs. Get targeted suggestions that understand your code's intent.
        </p>
      </div>

      {/* Code Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-400 mb-2">
          Paste your code for analysis:
        </label>
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="w-full h-40 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-black focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          placeholder="Enter your code here..."
        />
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !codeInput.trim()}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing with AI...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Start AI Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Analysis Results
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              {mockSuggestions.length} suggestions found
            </div>
          </div>

          <div className="grid gap-4">
            {mockSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg border ${getSeverityColor(suggestion.severity)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {suggestion.title}
                        </h3>
                        {suggestion.lineNumber && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Line {suggestion.lineNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {suggestion.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs text-gray-500 capitalize">
                          {suggestion.type.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className={`text-xs font-medium ${suggestion.severity === 'high' ? 'text-red-600' :
                          suggestion.severity === 'medium' ? 'text-orange-600' :
                            'text-blue-600'
                          }`}>
                          {suggestion.severity.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium text-green-800">Analysis Complete</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              AI has analyzed your code structure, patterns, and context to provide these targeted improvements.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AIReview;