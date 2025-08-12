"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Code, 
  Settings, 
  Play, 
  Download, 
  Zap, 
  FileText,
  Eye,
  RotateCcw,
  Filter,
  TrendingUp,
  Shield,
  Lightbulb,
  Clock
} from 'lucide-react';

interface Issue {
  id: string;
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  category: 'formatting' | 'naming' | 'unused' | 'maintainability' | 'performance' | 'security';
  rule: string;
  message: string;
  suggestion: string;
  autoFixable: boolean;
  language: string;
}

interface LanguageConfig {
  name: string;
  extensions: string[];
  standards: string[];
  icon: string;
}

const BestPracticeChecker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [codeContent, setCodeContent] = useState<string>(`// JavaScript Example
function calculate_total(items, tax_rate) {
  let total = 0;
  let unused_var = "not used";
  
  for(let i=0;i<items.length;i++){
    total+=items[i]*1.2;
  }
  
  return total
}

const MyComponent = () => {
  const [count,setCount] = useState(0)
  return <div onClick={()=>setCount(count+1)}>{count}</div>
}`);
  
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [autoFixCount, setAutoFixCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const languages: Record<string, LanguageConfig> = {
    javascript: {
      name: 'JavaScript',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      standards: ['ESLint', 'Prettier', 'Standard JS'],
      icon: '🟨'
    },
    python: {
      name: 'Python',
      extensions: ['.py', '.pyw'],
      standards: ['PEP8', 'Black', 'Flake8'],
      icon: '🐍'
    },
    java: {
      name: 'Java',
      extensions: ['.java'],
      standards: ['Checkstyle', 'SpotBugs', 'PMD'],
      icon: '☕'
    },
    typescript: {
      name: 'TypeScript',
      extensions: ['.ts', '.tsx'],
      standards: ['TSLint', 'ESLint', 'Prettier'],
      icon: '🔷'
    }
  };

  const mockIssues: Issue[] = [
    {
      id: '1',
      line: 2,
      column: 1,
      severity: 'warning',
      category: 'naming',
      rule: 'camelCase',
      message: 'Function name should use camelCase',
      suggestion: 'Rename to "calculateTotal"',
      autoFixable: true,
      language: 'javascript'
    },
    {
      id: '2',
      line: 4,
      column: 7,
      severity: 'warning',
      category: 'unused',
      rule: 'no-unused-vars',
      message: 'Variable "unused_var" is declared but never used',
      suggestion: 'Remove unused variable',
      autoFixable: true,
      language: 'javascript'
    },
    {
      id: '3',
      line: 6,
      column: 10,
      severity: 'error',
      category: 'formatting',
      rule: 'space-infix-ops',
      message: 'Missing spaces around operators',
      suggestion: 'Add spaces: "i < items.length"',
      autoFixable: true,
      language: 'javascript'
    },
    {
      id: '4',
      line: 11,
      column: 15,
      severity: 'error',
      category: 'formatting',
      rule: 'semi',
      message: 'Missing semicolon',
      suggestion: 'Add semicolon at end of statement',
      autoFixable: true,
      language: 'javascript'
    },
    {
      id: '5',
      line: 7,
      column: 20,
      severity: 'info',
      category: 'maintainability',
      rule: 'magic-numbers',
      message: 'Avoid magic numbers',
      suggestion: 'Extract 1.2 to a named constant',
      autoFixable: false,
      language: 'javascript'
    },
    {
      id: '6',
      line: 15,
      column: 25,
      severity: 'warning',
      category: 'formatting',
      rule: 'object-curly-spacing',
      message: 'Missing spaces in object destructuring',
      suggestion: 'Add spaces: "{ count, setCount }"',
      autoFixable: true,
      language: 'javascript'
    }
  ];

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    setIssues([]);
    
    // Simulate API analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIssues(mockIssues);
    setIsAnalyzing(false);
  };

  const autoFixIssue = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (issue && issue.autoFixable) {
      setIssues(prev => prev.filter(i => i.id !== issueId));
      setAutoFixCount(prev => prev + 1);
    }
  };

  const autoFixAll = () => {
    const fixableIssues = filteredIssues.filter(issue => issue.autoFixable);
    fixableIssues.forEach(issue => {
      setTimeout(() => autoFixIssue(issue.id), Math.random() * 1000);
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'formatting': return <Code className="w-4 h-4" />;
      case 'naming': return <FileText className="w-4 h-4" />;
      case 'unused': return <Eye className="w-4 h-4" />;
      case 'maintainability': return <TrendingUp className="w-4 h-4" />;
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const severityMatch = filterSeverity === 'all' || issue.severity === filterSeverity;
    const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const severityCounts = {
    error: issues.filter(i => i.severity === 'error').length,
    warning: issues.filter(i => i.severity === 'warning').length,
    info: issues.filter(i => i.severity === 'info').length
  };

  const categoryCounts = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-white/20 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Best Practice Checker</h1>
              <p className="text-gray-600">Automated code quality analysis and fixes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Language Selector */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Code Analysis</h2>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(languages).map(([key, lang]) => (
                      <option key={key} value={key}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={analyzeCode}
                    disabled={isAnalyzing}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Analyze Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Standards Info */}
              <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                <div className="flex items-center text-blue-800 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="font-medium">Standards: </span>
                  <span>{languages[selectedLanguage].standards.join(', ')}</span>
                </div>
              </div>

              {/* Code Editor */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paste your code here..."
                />
                {issues.length > 0 && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {severityCounts.error > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        {severityCounts.error} errors
                      </span>
                    )}
                    {severityCounts.warning > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                        {severityCounts.warning} warnings
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            {issues.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{severityCounts.error}</div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{severityCounts.warning}</div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{severityCounts.info}</div>
                  <div className="text-sm text-gray-600">Info</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{autoFixCount}</div>
                  <div className="text-sm text-gray-600">Auto-fixed</div>
                </div>
              </div>
            )}
          </div>

          {/* Issues Panel */}
          <div className="space-y-4">
            {issues.length > 0 && (
              <>
                {/* Filters and Auto-fix */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Issues</h3>
                    <button
                      onClick={autoFixAll}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition-colors"
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Auto-fix All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <select
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Severities</option>
                      <option value="error">Errors</option>
                      <option value="warning">Warnings</option>
                      <option value="info">Info</option>
                    </select>
                    
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="formatting">Formatting</option>
                      <option value="naming">Naming</option>
                      <option value="unused">Unused Code</option>
                      <option value="maintainability">Maintainability</option>
                    </select>
                  </div>
                </div>

                {/* Issues List */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {filteredIssues.length} issues found
                      </span>
                      <span className="text-sm text-gray-500">
                        {filteredIssues.filter(i => i.autoFixable).length} auto-fixable
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {filteredIssues.map((issue, index) => (
                      <div
                        key={issue.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedIssue === issue.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex items-center space-x-2">
                              {getSeverityIcon(issue.severity)}
                              {getCategoryIcon(issue.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {issue.message}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Line {issue.line}:{issue.column}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                Rule: {issue.rule}
                              </div>
                              {selectedIssue === issue.id && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-md">
                                  <div className="text-sm text-blue-800 mb-2">
                                    <strong>Suggestion:</strong> {issue.suggestion}
                                  </div>
                                  {issue.autoFixable && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        autoFixIssue(issue.id);
                                      }}
                                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      <Zap className="w-3 h-3 mr-1" />
                                      Auto-fix
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {issue.autoFixable && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                <Zap className="w-3 h-3 mr-1" />
                                Fixable
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs capitalize ${
                              issue.severity === 'error' ? 'bg-red-100 text-red-800' :
                              issue.severity === 'warning' ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Category Breakdown */}
            {issues.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Categories</h3>
                <div className="space-y-3">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(category)}
                        <span className="text-sm text-gray-700 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Analysis Severity
                    </label>
                    <div className="space-y-2">
                      {['error', 'warning', 'info'].map(severity => (
                        <label key={severity} className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm text-gray-700 capitalize">{severity}s</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-fix Options
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-gray-700">Enable auto-fix</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">Auto-fix on save</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestPracticeChecker;