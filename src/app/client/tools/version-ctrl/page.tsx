"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Plus, 
  Minus, 
  Edit3, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  User, 
  Download, 
  Filter, 
  Maximize2, 
  Settings,
  TrendingUp,
  Zap,
  RefreshCw,
  FileText,
  Calendar,
  Hash,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface DiffLine {
  id: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged' | 'context';
  lineNumber: {
    old?: number;
    new?: number;
  };
  content: string;
  annotation?: string;
  semanticType?: 'refactor' | 'performance' | 'bugfix' | 'feature' | 'style';
  complexity?: number;
}

interface CommitInfo {
  hash: string;
  author: string;
  date: string;
  message: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
}

interface FileComparison {
  filename: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed';
  additions: number;
  deletions: number;
  lines: DiffLine[];
}

const VersionComparisonTool: React.FC = () => {
  const [selectedCommits, setSelectedCommits] = useState<{from: string, to: string}>({
    from: 'abc1234',
    to: 'def5678'
  });
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [showUnchanged, setShowUnchanged] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string>('components/UserProfile.tsx');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [annotationsEnabled, setAnnotationsEnabled] = useState(true);

  const mockCommits: CommitInfo[] = [
    {
      hash: 'abc1234',
      author: 'John Doe',
      date: '2024-01-15T10:30:00Z',
      message: 'Refactor user profile component for better performance',
      filesChanged: 3,
      insertions: 45,
      deletions: 32
    },
    {
      hash: 'def5678',
      author: 'Jane Smith',
      date: '2024-01-16T14:20:00Z',
      message: 'Add user avatar caching and optimize rendering',
      filesChanged: 5,
      insertions: 67,
      deletions: 12
    },
    {
      hash: 'ghi9012',
      author: 'Mike Johnson',
      date: '2024-01-17T09:15:00Z',
      message: 'Fix memory leak in profile data loading',
      filesChanged: 2,
      insertions: 23,
      deletions: 8
    }
  ];

  const mockFileComparison: FileComparison = {
    filename: 'components/UserProfile.tsx',
    status: 'modified',
    additions: 15,
    deletions: 8,
    lines: [
      {
        id: '1',
        type: 'unchanged',
        lineNumber: { old: 1, new: 1 },
        content: 'import React, { useState, useEffect, memo } from \'react\';'
      },
      {
        id: '2',
        type: 'added',
        lineNumber: { new: 2 },
        content: 'import { useCallback, useMemo } from \'react\';',
        annotation: 'Performance: Added hooks for memoization',
        semanticType: 'performance'
      },
      {
        id: '3',
        type: 'unchanged',
        lineNumber: { old: 2, new: 3 },
        content: 'import { UserData } from \'../types/User\';'
      },
      {
        id: '4',
        type: 'removed',
        lineNumber: { old: 3 },
        content: 'import { heavyCalculation } from \'../utils/calculations\';',
        annotation: 'Removed unused import',
        semanticType: 'style'
      },
      {
        id: '5',
        type: 'unchanged',
        lineNumber: { old: 4, new: 4 },
        content: ''
      },
      {
        id: '6',
        type: 'modified',
        lineNumber: { old: 5, new: 5 },
        content: 'interface Props {',
        annotation: 'Refactored to use interface instead of type'
      },
      {
        id: '7',
        type: 'unchanged',
        lineNumber: { old: 6, new: 6 },
        content: '  userData: UserData;'
      },
      {
        id: '8',
        type: 'added',
        lineNumber: { new: 7 },
        content: '  onProfileUpdate?: (data: UserData) => void;',
        annotation: 'Feature: Added callback for profile updates',
        semanticType: 'feature'
      },
      {
        id: '9',
        type: 'unchanged',
        lineNumber: { old: 7, new: 8 },
        content: '}'
      },
      {
        id: '10',
        type: 'unchanged',
        lineNumber: { old: 8, new: 9 },
        content: ''
      },
      {
        id: '11',
        type: 'modified',
        lineNumber: { old: 9, new: 10 },
        content: 'const UserProfile: React.FC<Props> = memo(({ userData, onProfileUpdate }) => {',
        annotation: 'Performance: Wrapped component with React.memo',
        semanticType: 'performance'
      },
      {
        id: '12',
        type: 'added',
        lineNumber: { new: 11 },
        content: '  const [isLoading, setIsLoading] = useState(false);',
        annotation: 'State: Added loading state management',
        semanticType: 'feature'
      },
      {
        id: '13',
        type: 'unchanged',
        lineNumber: { old: 10, new: 12 },
        content: '  const [profileData, setProfileData] = useState(userData);'
      },
      {
        id: '14',
        type: 'unchanged',
        lineNumber: { old: 11, new: 13 },
        content: ''
      },
      {
        id: '15',
        type: 'added',
        lineNumber: { new: 14 },
        content: '  const memoizedUserData = useMemo(() => ({',
        annotation: 'Performance: Memoized complex user data calculations',
        semanticType: 'performance'
      },
      {
        id: '16',
        type: 'added',
        lineNumber: { new: 15 },
        content: '    ...userData,',
        semanticType: 'performance'
      },
      {
        id: '17',
        type: 'added',
        lineNumber: { new: 16 },
        content: '    displayName: userData.firstName + \' \' + userData.lastName',
        semanticType: 'performance'
      },
      {
        id: '18',
        type: 'added',
        lineNumber: { new: 17 },
        content: '  }), [userData.firstName, userData.lastName]);',
        semanticType: 'performance'
      }
    ]
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getLineTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-50 border-l-4 border-green-500';
      case 'removed': return 'bg-red-50 border-l-4 border-red-500';
      case 'modified': return 'bg-blue-50 border-l-4 border-blue-500';
      case 'unchanged': return showUnchanged ? 'bg-gray-50' : 'hidden';
      default: return '';
    }
  };

  const getSemanticIcon = (semanticType?: string) => {
    switch (semanticType) {
      case 'performance': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'refactor': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'bugfix': return <Plus className="w-4 h-4 text-red-500" />;
      case 'feature': return <Plus className="w-4 h-4 text-green-500" />;
      case 'style': return <Edit3 className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  const analyzeChanges = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const filteredLines = mockFileComparison.lines.filter(line => {
    if (filterType === 'all') return true;
    return line.type === filterType || line.semanticType === filterType;
  });

  const changeStats = {
    added: filteredLines.filter(l => l.type === 'added').length,
    removed: filteredLines.filter(l => l.type === 'removed').length,
    modified: filteredLines.filter(l => l.type === 'modified').length,
    performance: filteredLines.filter(l => l.semanticType === 'performance').length,
    refactor: filteredLines.filter(l => l.semanticType === 'refactor').length,
    feature: filteredLines.filter(l => l.semanticType === 'feature').length
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */} 
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Version Comparison</h1>
              <p className="text-gray-600">Intelligent diff analysis with semantic awareness</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </button>
            <button
              onClick={analyzeChanges}
              disabled={isAnalyzing}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Re-analyze
                </>
              )}
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Timeline View */}
        {showTimeline && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commit Timeline</h3>
            <div className="space-y-4">
              {mockCommits.map((commit, index) => (
                <div key={commit.hash} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <GitCommit className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono text-sm text-gray-600">#{commit.hash}</span>
                      <span className="text-sm text-gray-500">by {commit.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(commit.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium">{commit.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>{commit.filesChanged} files changed</span>
                      <span className="text-green-600">+{commit.insertions}</span>
                      <span className="text-red-600">-{commit.deletions}</span>
                    </div>
                  </div>
                  {index < mockCommits.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">From:</label>
                <select
                  value={selectedCommits.from}
                  onChange={(e) => setSelectedCommits(prev => ({ ...prev, from: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {mockCommits.map(commit => (
                    <option key={commit.hash} value={commit.hash}>
                      {commit.hash} - {commit.message.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">To:</label>
                <select
                  value={selectedCommits.to}
                  onChange={(e) => setSelectedCommits(prev => ({ ...prev, to: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {mockCommits.map(commit => (
                    <option key={commit.hash} value={commit.hash}>
                      {commit.hash} - {commit.message.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    viewMode === 'side-by-side' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Side by Side
                </button>
                <button
                  onClick={() => setViewMode('unified')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    viewMode === 'unified' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unified
                </button>
              </div>
              
              <button
                onClick={() => setShowUnchanged(!showUnchanged)}
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  showUnchanged 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showUnchanged ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                Unchanged Lines
              </button>
              
              <button
                onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  annotationsEnabled 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4 mr-1" />
                Annotations
              </button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">+{changeStats.added}</div>
              <div className="text-xs text-green-700">Added</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-red-600">-{changeStats.removed}</div>
              <div className="text-xs text-red-700">Removed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{changeStats.modified}</div>
              <div className="text-xs text-blue-700">Modified</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{changeStats.performance}</div>
              <div className="text-xs text-orange-700">Performance</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{changeStats.refactor}</div>
              <div className="text-xs text-purple-700">Refactor</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-indigo-600">{changeStats.feature}</div>
              <div className="text-xs text-indigo-700">Features</div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Changes</option>
              <option value="added">Added Lines</option>
              <option value="removed">Removed Lines</option>
              <option value="modified">Modified Lines</option>
              <option value="performance">Performance Improvements</option>
              <option value="refactor">Refactoring</option>
              <option value="feature">New Features</option>
            </select>
          </div>
        </div>

        {/* File Comparison */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* File Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">{mockFileComparison.filename}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  mockFileComparison.status === 'added' ? 'bg-green-100 text-green-800' :
                  mockFileComparison.status === 'modified' ? 'bg-blue-100 text-blue-800' :
                  mockFileComparison.status === 'deleted' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {mockFileComparison.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="text-green-600">+{mockFileComparison.additions}</span>
                <span className="text-red-600">-{mockFileComparison.deletions}</span>
                <button
                  onClick={() => toggleSection('main')}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  {collapsedSections.has('main') ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Diff Content */}
          {!collapsedSections.has('main') && (
            <div className="divide-y divide-gray-100">
              {filteredLines.map((line, index) => (
                <div
                  key={line.id}
                  className={`${getLineTypeColor(line.type)} ${
                    line.type === 'unchanged' && !showUnchanged ? 'hidden' : 'block'
                  }`}
                >
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="flex-shrink-0 w-16 bg-gray-50 text-gray-500 text-xs text-center py-2 border-r">
                      <div className="flex">
                        <div className="w-8">{line.lineNumber.old || ''}</div>
                        <div className="w-8">{line.lineNumber.new || ''}</div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start p-2">
                        {/* Change Type Icon */}
                        <div className="flex-shrink-0 w-6 h-6 mr-2 flex items-center justify-center">
                          {line.type === 'added' && <Plus className="w-4 h-4 text-green-600" />}
                          {line.type === 'removed' && <Minus className="w-4 h-4 text-red-600" />}
                          {line.type === 'modified' && <Edit3 className="w-4 h-4 text-blue-600" />}
                          {line.semanticType && getSemanticIcon(line.semanticType)}
                        </div>
                        
                        {/* Code Content */}
                        <div className="flex-1">
                          <pre className="text-sm font-mono text-gray-900 whitespace-pre-wrap">
                            {line.content}
                          </pre>
                          
                          {/* Annotation */}
                          {annotationsEnabled && line.annotation && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                              <div className="flex items-start space-x-2">
                                <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-yellow-800">{line.annotation}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionComparisonTool;